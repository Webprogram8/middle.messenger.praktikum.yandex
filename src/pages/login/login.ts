import '../../layouts/main';
import {Button} from '../../components/button';
import {TContextBase, TStyles} from '../../lib/types';
import Input from '../../components/input/input';
import Block from '../../lib/view/block';
import Form from '../../lib/form';

import template from './login.hbs';
import * as pageStyles from './login.module.css';

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
					_withInternalID: true
				}),
				inputPassword: new Input({
					type: 'password',
					name: 'password',
					label: 'Password',
					class: pageStyles.input,
					_withInternalID: true
				})
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

	get formEl() {
		return this.element?.getElementsByTagName('form')[0];
	}

	handleSubmit(data: object) {
		console.log(data);
		location.hash = '#chats';
	}

	componentDidMount() {
		if (this.formEl) {
			this.form = new Form(this.formEl);
			this.form.eventBus.on(Form.EVENTS.SUBMIT, this.handleSubmit.bind(this));
		}
	}
}
