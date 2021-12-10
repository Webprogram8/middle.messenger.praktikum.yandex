import '../../layouts/main';
import Block from '../../lib/view/block';
import Form from '../../lib/form';
import {TContextBase, TFormErrors, TStyles} from '../../lib/types';
import {validateLogin} from '../../lib/validation/validateLogin';
import {validateName} from '../../lib/validation/validateName';
import {validateEmail} from '../../lib/validation/validateEmail';
import {validatePhone} from '../../lib/validation/validatePhone';

import {Input} from '../../components/input';
import {Button} from '../../components/button';

import template from './account.hbs';
import * as pageStyles from './account.module.css';

type TContext = Partial<{
	pageStyles: TStyles;
}> &
	TContextBase;

const inputs = {
	inputFirstName: new Input({
		name: 'first_name',
		label: 'First name',
		_withInternalID: true
	}),
	inputSecondName: new Input({
		name: 'second_name',
		label: 'Second name',
		_withInternalID: true
	}),
	inputDisplayName: new Input({
		name: 'display_name',
		label: 'Display name',
		_withInternalID: true
	}),
	inputLogin: new Input({
		name: 'login',
		label: 'Login',
		_withInternalID: true
	}),
	inputEmail: new Input({
		name: 'email',
		label: 'Email',
		_withInternalID: true
	}),
	inputPhone: new Input({
		name: 'phone',
		label: 'Phone',
		_withInternalID: true
	}),
	inputOldPassword: new Input({
		type: 'password',
		name: 'oldPassword',
		label: 'Old password',
		_withInternalID: true
	}),
	inputNewPassword: new Input({
		type: 'password',
		name: 'newPassword',
		label: 'New password',
		_withInternalID: true
	})
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
				...inputs
			},
			template
		);
	}

	protected context() {
		return {
			...super.context(),
			pageStyles
		};
	}

	get settingsFormEl() {
		return this.element?.getElementsByClassName('accountSettingsForm')[0] as HTMLFormElement;
	}

	get passwordFormEl() {
		return this.element?.getElementsByClassName('accountPasswordForm')[0] as HTMLFormElement;
	}

	handleSubmit(data: object) {
		console.log(data);
	}

	handleErrors(errors: TFormErrors) {
		Object.values(inputs).forEach((input) =>
			input.setProps({error: input.name && errors[input.name]})
		);
	}

	handleValid() {
		Object.values(inputs).forEach((input) => input.setProps({error: undefined}));
	}

	componentDidMount() {
		console.log(this.settingsFormEl);
		if (this.settingsFormEl) {
			this.settingsForm = new Form(this.settingsFormEl, {
				first_name: validateName,
				second_name: validateName,
				login: validateLogin,
				email: validateEmail,
				phone: validatePhone
			});
			this.settingsForm.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
			this.settingsForm.eventBus.on(Form.EVENTS.ERRORS, this.handleErrors.bind(this));
			this.settingsForm.eventBus.on(Form.EVENTS.VALID, this.handleValid.bind(this));
		}
		if (this.passwordFormEl) {
			this.passwordForm = new Form(this.passwordFormEl);
			this.passwordForm.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
		}
	}
}
