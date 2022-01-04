import '../../layouts/main';
import '../../partials/chat-item';
import '../../partials/chat-message';
import Block from '../../lib/view/block';
import {Input} from '../../components/input';
import Form from '../../lib/form';
import {validateNotEmpty} from '../../lib/validation/validateNotEmpty';
import {TFormErrors, TProps, TUser} from '../../lib/types';
import {URLS} from '../../routes';
import Store from '../../lib/data/store';

import template from './chats.hbs';
import * as pageStyles from './chats.module.css';
import {Button} from '../../components/button';
import ChatsController from '../../controllers/ChatsController';
import {login} from '../registration/registration.module.css';
import WebSocketService from '../../lib/webSocket';

export default class ChatsPage extends Block<TProps> {
	form: Form | null = null;
	newChatForm: Form | null = null;
	newUserForm: Form | null = null;

	action: 'add' | 'remove' = 'add';

	constructor() {
		super(
			'div',
			{
				pageStyles,
				searchInput: new Input({
					name: 'search',
					label: 'Search',
					class: pageStyles.searchInput,
				}),
				messageInput: new Input({
					name: 'message',
					label: 'Type something',
					class: pageStyles.messageInput,
				}),
				chats: [],
				currentChat: null,
				profileUrl: URLS.settings,
				inputNewChat: new Input({
					name: 'title',
					label: 'New chat title',
					_withInternalID: true,
				}),
				button: new Button({text: '+', _withInternalID: true}),
				inputNewUser: new Input({
					name: 'login',
					label: 'User name',
					_withInternalID: true,
				}),
				currentChatUsers: [],
			},
			template,
		);

		Store.on('chats', (state) => {
			this.setProps({chats: state.chats});
		});
		Store.on('currentChatId', (state) => {
			const currentChat = state.chats.find((chat) => chat.id === state.currentChatId);
			this.setProps({currentChat});
		});
		Store.on('currentChatUsers', ({currentChatUsers}) => {
			this.setProps({currentChatUsers});
		});
		ChatsController.getChats();

		this.handleClick = this.handleClick.bind(this);
	}

	addEvents() {
		this.element?.addEventListener('click', this.handleClick);
	}

	removeEvents() {
		this.element?.removeEventListener('click', this.handleClick);
	}

	handleClick = (e: MouseEvent) => {
		const el = e.target as HTMLElement;
		const currentChatId = Store.getState().currentChatId;
		if (el.classList.contains('chat-item') && el.dataset.id) {
			ChatsController.setCurrentChat(Number(el.dataset.id));
		} else if (el.classList.contains('delete-chat') && currentChatId) {
			ChatsController.deleteChat(currentChatId);
		}
	};

	handleSubmit(data: {message: string}) {
		WebSocketService.send(data.message);
		this.children.messageInput.setProps({value: ''});
	}

	handleErrors(errors: TFormErrors) {
		this.children.messageInput?.setProps({error: errors.message});
	}

	handleValid() {
		this.children.messageInput?.setProps({error: undefined});
	}

	handleNewChat(data: {title: string}) {
		ChatsController.createChat(data.title).then(() => ChatsController.getChats());
	}

	handleNewChatErrors(errors: TFormErrors) {
		this.children.inputNewChat?.setProps({error: errors.message});
	}

	handleNewChatValid() {
		this.children.inputNewChat?.setProps({error: undefined});
	}

	handleNewUser(data: {login: string; action: string}) {
		ChatsController.findUserByLogin(data.login)
			.then((user) => {
				const userId = (user as TUser).id;
				const currentChatId = Store.getState().currentChatId;
				if (!userId || !currentChatId) {
					return;
				}
				if (data.action === '+') {
					ChatsController.addUser(userId, currentChatId);
				} else {
					ChatsController.deleteUser(userId, currentChatId);
				}
			})
			.catch((reason) => {
				console.log('catch', reason);
				this.setProps({newUserError: reason});
			});
	}

	handleNewUserErrors(errors: TFormErrors) {
		this.children.inputNewUser?.setProps({error: errors.message});
	}

	handleNewUserValid() {
		this.children.inputNewUser?.setProps({error: undefined});
		this.setProps({newUserError: null});
	}

	get formEl() {
		return document.getElementById('sendMessageForm') as HTMLFormElement;
	}

	get newChatFormEl() {
		return document.getElementById('newChatForm') as HTMLFormElement;
	}

	get newUserFormEl() {
		return document.getElementById('newUserForm') as HTMLFormElement;
	}

	componentDidMount() {
		if (this.formEl) {
			this.form = new Form(this.formEl, {message: validateNotEmpty});
			this.form.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
			this.form.eventBus.on(Form.EVENTS.ERRORS, this.handleErrors.bind(this));
			this.form.eventBus.on(Form.EVENTS.VALID, this.handleValid.bind(this));
		}
		if (this.newChatFormEl) {
			this.newChatForm = new Form(this.newChatFormEl, {title: validateNotEmpty});
			this.newChatForm.eventBus.on(Form.EVENTS.SUBMIT, this.handleNewChat.bind(this));
			this.newChatForm.eventBus.on(Form.EVENTS.ERRORS, this.handleNewChatErrors.bind(this));
			this.newChatForm.eventBus.on(Form.EVENTS.VALID, this.handleNewChatValid.bind(this));
		}
		if (this.newUserFormEl) {
			this.newUserForm = new Form(this.newUserFormEl, {login: validateNotEmpty});
			this.newUserForm.eventBus.on(Form.EVENTS.SUBMIT, this.handleNewUser.bind(this));
			this.newUserForm.eventBus.on(Form.EVENTS.ERRORS, this.handleNewUserErrors.bind(this));
			this.newUserForm.eventBus.on(Form.EVENTS.VALID, this.handleNewUserValid.bind(this));
		}
	}
}
