import {TChat, TChatsRequest, TUser, TChatData, TUserFormData} from '../lib/types';
import UserAPI from '../api/user-api';
import ChatAPI from '../api/chat-api';
import store from '../lib/data/store';
import WebSocketService, {EWebSocketEvents} from '../lib/webSocket';
import {prepareUserData} from '../utils/prepareUserData';

const prepareChatList = (chats: ReadonlyArray<TChatData>): ReadonlyArray<TChat> =>
	chats.map((chatData) => ({
		avatar: chatData.avatar,
		id: chatData.id,
		lastMessage: chatData.last_message,
		unreadCount: chatData.unread_count,
		createdBy: chatData.created_by,
		title: chatData.title,
	}));

const prepareChatUsers = (users: ReadonlyArray<TUserFormData>): ReadonlyArray<TUser> =>
	users.map(prepareUserData);

export default class ChatsController {
	static getChats(payload?: TChatsRequest) {
		return new Promise((resolve, reject) =>
			ChatAPI.getChats(payload)
				.then((chatsJson) => {
					const chats = prepareChatList(chatsJson as ReadonlyArray<TChatData>);
					store.set('chats', chats);
					resolve(chats);
				})
				.catch(({reason}) => reject(reason)),
		);
	}

	static createChat(title: string) {
		return new Promise((resolve, reject) =>
			ChatAPI.createChat(title)
				.then(resolve)
				.catch(({reason}) => reject(reason)),
		);
	}

	static deleteChat(id: number) {
		return new Promise((resolve, reject) =>
			ChatAPI.deleteChat(id)
				.then(() => {
					const state = store.getState();
					store.set(
						'chats',
						state.chats.filter((chat) => chat.id !== id),
					);
					if (id === state.currentChatId) {
						store.set('currentChatId', null);
					}
					resolve(true);
				})
				.catch(({reason}) => reject(reason)),
		);
	}

	static getChatUsers(id: number) {
		return new Promise((resolve, reject) =>
			ChatAPI.getChatUsers(id)
				.then((users) => {
					store.set(
						'currentChatUsers',
						prepareChatUsers(users as ReadonlyArray<TUserFormData>),
					);
					resolve(true);
				})
				.catch(({reason}) => reject(reason)),
		);
	}

	static async setCurrentChat(id: number) {
		store.set('currentChatId', id);
		store.set('currentChatUsers', []);
		store.set('currentChatToken', '');
		store.set('currentChatMessages', []);
		await this.getChatUsers(id);
		const token = await this.getChatToken(id);
		const userId = store.getState().user?.id;
		if (token && userId) {
			WebSocketService.connect(String(userId), id, String(token));
			WebSocketService.on(EWebSocketEvents.Message, this.handleWebsocketMessages.bind(this));
		}
	}

	static findUserByLogin(login: string) {
		return new Promise((resolve, reject) =>
			UserAPI.searchByLogin(login)
				// @ts-ignore
				.then((usersJson) => {
					const users = prepareChatUsers(usersJson as ReadonlyArray<TUserFormData>);
					if (users.length > 0) {
						resolve(users[0]);
					} else {
						reject(new Error('User not found'));
					}
				})
				.catch((error) => {
					console.log(error);
					reject(error.reason);
				}),
		);
	}

	static deleteUser(user: number, chatId: number) {
		return new Promise((resolve, reject) =>
			ChatAPI.removeUsersFromChat([user], chatId)
				.then(resolve)
				.catch(({reason}) => reject(reason)),
		);
	}

	static addUser(user: number, chatId: number) {
		return new Promise((resolve, reject) =>
			ChatAPI.addUsersToChat([user], chatId)
				.then(resolve)
				.catch(({reason}) => reject(reason)),
		);
	}

	static getChatToken(chatId: number) {
		return new Promise((resolve, reject) =>
			ChatAPI.getCurrentChatToken(chatId)
				.then((result) => {
					const {token} = result as {token: string};
					store.set('currentChatToken', token);
					resolve(String(token));
				})
				.catch(({reason}) => reject(reason)),
		);
	}

	static handleWebsocketMessages(event: MessageEvent) {
		if (event.type === 'message') {
			const data = JSON.parse(event.data);
			console.log('message', data);
			if (Array.isArray(data)) {
				store.set('currentChatMessages', data);
			} else {
				store.set('currentChatMessages', [...store.getState().currentChatMessages, data]);
			}
		}
	}
}
