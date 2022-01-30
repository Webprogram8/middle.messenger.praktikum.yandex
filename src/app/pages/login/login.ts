import '../../layouts/main';
import {Button} from '../../components/button';
import {TContextBase, TFormErrors, TStyles} from '../../lib/types';
import Input from '../../components/input/input';
import Block from '../../lib/view/block';
import Form from '../../lib/form';
import {URLS} from '../../routes';
import AuthController from '../../controllers/AuthController';

import template from './login.hbs';
import pageStyles from './login.module.css';
import {validateNotEmpty} from '../../lib/validation/validateNotEmpty';

type TContext = Partial<{
	pageStyles: TStyles;
}> &
	TContextBase;

export default class LoginPage extends Block<TContext> {
	form: Form | null = null;

	constructor() {
		super(
			'div',
			{
				button: new Button({text: 'Sign in', _withInternalID: true}),
				inputLogin: new Input({
					name: 'login',
					label: 'Login',
					class: pageStyles.input,
					_withInternalID: true,
				}),
				inputPassword: new Input({
					type: 'password',
					name: 'password',
					label: 'Password',
					class: pageStyles.input,
					_withInternalID: true,
				}),
				registrationUrl: URLS.registration,
				serverError: null,
			},
			template,
		);
	}

	protected context() {
		return {
			...super.context(),
			pageStyles,
		};
	}

	get formEl() {
		return this.element?.getElementsByTagName('form')[0];
	}

	async handleSubmit(data: {login: string; password: string}) {
		try {
			await AuthController.signIn(data.login, data.password);
		} catch (e: unknown) {
			this.setProps({serverError: (e as {reason: string}).reason});
		}
	}

	handleErrors(errors: TFormErrors) {
		this.children.inputLogin.setProps({error: errors.login});
		this.children.inputPassword.setProps({error: errors.password});
	}

	handleValid() {
		this.children.inputLogin.setProps({error: undefined});
		this.children.inputPassword.setProps({error: undefined});
	}

	componentDidMount() {
		if (this.formEl) {
			this.form = new Form(this.formEl, {
				login: validateNotEmpty,
				password: validateNotEmpty,
			});
			this.form.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
			this.form.eventBus.on(Form.EVENTS.ERRORS, this.handleErrors.bind(this));
			this.form.eventBus.on(Form.EVENTS.VALID, this.handleValid.bind(this));
		}
	}
}
