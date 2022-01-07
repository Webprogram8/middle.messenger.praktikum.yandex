import '../../layouts/main';

import {TContextBase, TFormErrors, TStyles, TUserFormData} from '../../lib/types';
import {Button} from '../../components/button';
import Block from '../../lib/view/block';
import Input from '../../components/input/input';
import Form from '../../lib/form';
import {validateLogin} from '../../lib/validation/validateLogin';
import {validatePassword} from '../../lib/validation/validatePassword';
import {validateName} from '../../lib/validation/validateName';
import {validateEmail} from '../../lib/validation/validateEmail';
import {validatePhone} from '../../lib/validation/validatePhone';

import template from './registration.hbs';
import * as pageStyles from './registration.module.css';
import {URLS} from '../../routes';
import AuthController from '../../controllers/AuthController';
import {Router} from '../../lib/routing/router';

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
	inputPassword: new Input({
		type: 'password',
		name: 'password',
		label: 'Password',
		_withInternalID: true,
	}),
	inputRepeatPassword: new Input({
		type: 'password',
		name: 'password2',
		label: 'Repeat password',
		_withInternalID: true,
	}),
};

export default class RegistrationPage extends Block<TContext> {
	form: Form | null = null;

	constructor() {
		super(
			'div',
			{
				button: new Button({text: 'Create account'}),
				...inputs,
				loginUrl: URLS.login,
				pageStyles,
			},
			template,
		);
	}

	get formEl() {
		return this.element?.getElementsByClassName('registrationForm')[0] as HTMLFormElement;
	}

	validate() {
		const errors = this.form?.validate();
		if (errors && Object.values(errors).length) {
			this.handleErrors(errors);
		}
	}

	handleSubmit(data: TUserFormData) {
		AuthController.signUp(data)
			.then(() => {
				this.setProps({serverError: null});
				Router.instance().go(URLS.login);
			})
			.catch((serverError: string) => {
				this.setProps({serverError});
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
		if (this.formEl) {
			this.form = new Form(this.formEl, {
				first_name: validateName,
				second_name: validateName,
				login: validateLogin,
				password: validatePassword,
				password2: validatePassword,
				email: validateEmail,
				phone: validatePhone,
			});
			this.form.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
			this.form.eventBus.on(Form.EVENTS.ERRORS, this.handleErrors.bind(this));
			this.form.eventBus.on(Form.EVENTS.VALID, this.handleValid.bind(this));
		}
	}
}
