import '../../layouts/main';
import Block from '../../lib/view/block';
import Form from '../../lib/form';
import {TContextBase, TFormErrors, TStyles, TUserFormData} from '../../lib/types';
import {validateLogin} from '../../lib/validation/validateLogin';
import {validateName} from '../../lib/validation/validateName';
import {validateEmail} from '../../lib/validation/validateEmail';
import {validatePhone} from '../../lib/validation/validatePhone';

import {Input} from '../../components/input';
import {Button} from '../../components/button';

import template from './account.hbs';
import * as pageStyles from './account.module.css';
import UserController from '../../controllers/UserController';
import store from '../../lib/data/store';
import {prepareUserData} from '../../utils/prepareUserData';

type TContext = Partial<{
	pageStyles: TStyles;
}> &
	TContextBase;

const inputs = {
	inputFirstName: new Input({
		name: 'first_name',
		label: 'First name',
		_withInternalID: true,
	}),
	inputSecondName: new Input({
		name: 'second_name',
		label: 'Second name',
		_withInternalID: true,
	}),
	inputDisplayName: new Input({
		name: 'display_name',
		label: 'Display name',
		_withInternalID: true,
	}),
	inputLogin: new Input({
		name: 'login',
		label: 'Login',
		_withInternalID: true,
	}),
	inputEmail: new Input({
		name: 'email',
		label: 'Email',
		_withInternalID: true,
	}),
	inputPhone: new Input({
		name: 'phone',
		label: 'Phone',
		_withInternalID: true,
	}),
	inputOldPassword: new Input({
		type: 'password',
		name: 'oldPassword',
		label: 'Old password',
		_withInternalID: true,
	}),
	inputNewPassword: new Input({
		type: 'password',
		name: 'newPassword',
		label: 'New password',
		_withInternalID: true,
	}),
};

const getInputsWithData = () => {
	const {user} = store.getState();
	Object.values(inputs).forEach((input) => {
		if (user && input.name) {
			const value = user[input.name as keyof TUserFormData];
			if (value) {
				input.setProps({value});
			}
		}
	});
	return inputs;
};

export default class AccountPage extends Block<TContext> {
	settingsForm: Form | null = null;

	passwordForm: Form | null = null;

	inputs: Input[] = [];

	constructor() {
		super(
			'div',
			{
				buttonSaveData: new Button({text: 'Save data'}),
				buttonChangePassword: new Button({text: 'Change'}),
				...getInputsWithData(),
				user: store.getState().user,
			},
			template,
		);

		store.on('user', (state) => {
			this.setProps({user: store.getState().user});
		});
	}

	protected context() {
		return {
			...super.context(),
			pageStyles,
		};
	}

	get settingsFormEl() {
		return document.getElementById('accountSettingsForm') as HTMLFormElement;
	}

	get passwordFormEl() {
		return document.getElementById('accountPasswordForm') as HTMLFormElement;
	}

	get avatarFormEl() {
		return document.getElementById('avatarForm') as HTMLFormElement;
	}

	get avatarInputEl() {
		return document.getElementById('avatarInput') as HTMLInputElement;
	}

	handleSubmit(data: TUserFormData) {
		UserController.changeUser(data)
			.then(() => {
				this.setProps({serverError: null, dataMessage: 'Data saved'});
			})
			.catch((serverError) => {
				this.setProps({serverError, dataMessage: null});
			});
	}

	handlePasswordSubmit({oldPassword, newPassword}: {oldPassword: string; newPassword: string}) {
		UserController.changePassword(oldPassword, newPassword)
			.then(() => {
				this.setProps({passwordServerError: null, passwordDataMessage: 'Password changed'});
			})
			.catch((passwordServerError) => {
				this.setProps({passwordServerError, passwordDataMessage: null});
			});
	}

	handleAvatarChange(event: Event) {
		const data = new FormData(this.avatarFormEl);
		UserController.changeAvatar(data)
			.then((userData) => {
				this.setProps({avatarServerError: null});
				store.set('user', prepareUserData(userData as TUserFormData));
			})
			.catch((avatarServerError) => {
				this.setProps({avatarServerError});
			});
	}

	handleErrors(errors: TFormErrors) {
		Object.values(inputs).forEach((input) =>
			input.setProps({error: input.name && errors[input.name]}),
		);
	}

	handleValid() {
		Object.values(inputs).forEach((input) => input.setProps({error: undefined}));
	}

	componentDidMount() {
		if (this.settingsFormEl) {
			this.settingsForm = new Form(this.settingsFormEl, {
				first_name: validateName,
				second_name: validateName,
				login: validateLogin,
				email: validateEmail,
				phone: validatePhone,
			});
			this.settingsForm.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
			this.settingsForm.eventBus.on(Form.EVENTS.ERRORS, this.handleErrors.bind(this));
			this.settingsForm.eventBus.on(Form.EVENTS.VALID, this.handleValid.bind(this));
		}
		if (this.passwordFormEl) {
			this.passwordForm = new Form(this.passwordFormEl);
			this.passwordForm.eventBus.on(Form.EVENTS.SUBMIT, this.handlePasswordSubmit.bind(this));
		}
		if (this.avatarFormEl) {
			this.avatarInputEl.addEventListener('change', this.handleAvatarChange.bind(this));
		}
	}
}
