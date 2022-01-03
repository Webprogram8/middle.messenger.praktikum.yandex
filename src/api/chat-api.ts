import Http from '../lib/api/http';
import {TChatsRequest} from '../lib/types';

const chatsAPIInstance = new Http('/api/v2/chats');

class ChatAPI {
	static headers() {
		return {
			credentials: 'include',
			mode: 'cors',
			'Content-Type': 'application/json'
		};
	}

	static getChats(payload: TChatsRequest = {}) {
		return chatsAPIInstance.get('/', {data: payload});
	}

	static createChat(title: string) {
		return chatsAPIInstance.post('/', {headers: this.headers(), data: {title}});
	}

	static deleteChat(chatId: number) {
		return chatsAPIInstance.delete('/', {data: {chatId}});
	}

	static addUsersToChat(users: ReadonlyArray<number>, chatId: number) {
		return chatsAPIInstance.put('/users', {headers: this.headers(), data: {chatId, users}});
	}

	static removeUsersFromChat(users: ReadonlyArray<number>, chatId: number) {
		return chatsAPIInstance.delete('/users', {headers: this.headers(), data: {chatId, users}});
	}

	static getChatUsers(id: number) {
		return chatsAPIInstance.get(`/${id}/users`);
	}

	static getCurrentChatToken(id: number) {
		return chatsAPIInstance.post(`/token/${id}`);
	}
}

export default ChatAPI;
