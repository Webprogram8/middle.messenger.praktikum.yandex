// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars.runtime';

import Block from '../../lib/view/block';
import {TContextBase, TStyles} from '../../lib/types';
import {InputError} from '../../components/input-error';

import * as styles from './input.module.css';
import template from './input.hbs';

type TProps = Partial<
	{
		class: string;
		name: string;
		label: string;
		error: string;
		type: 'text' | 'password' | 'submit' | 'file';
		styles: TStyles;
		value: string;
		onChange: (value: string) => void;
		onBlur: () => void;
		onFocus: () => void;
	} & TContextBase
>;

const defaultContext: TProps = {
	type: 'text'
};

export default class Input extends Block<TProps> {
	value = '';

	focus = false;

	constructor(props: TProps = {}) {
		super(
			'div',
			{
				...defaultContext,
				styles,
				...props,
				errorBlock: new InputError(props.error, styles.errorMessage)
			},
			template
		);
	}

	protected createResources() {
		super.createResources();
		this.element?.classList.add(styles.root);
	}

	handleChange(event: Event) {
		const newValue = (event.target as HTMLInputElement)?.value;
		this.props.onChange?.(newValue);
		this.value = newValue;
	}

	handleBlur() {
		this.focus = false;
		this.props.onBlur?.();
	}

	handleFocus() {
		this.focus = true;
		this.props.onFocus?.();
	}

	componentDidMount() {
		const input = this.element?.getElementsByTagName('input')[0];
		if (input) {
			input.addEventListener('change', this.handleChange.bind(this));
			input.addEventListener('blur', this.handleBlur.bind(this));
			input.addEventListener('focus', this.handleFocus.bind(this));
		}
	}

	protected context(): TProps {
		return {
			value: this.value,
			...super.context()
		};
	}

	componentDidUpdate(oldProps: TProps, newProps: TProps) {
		if (newProps.error || (!newProps.error && oldProps.error)) {
			this.props.error = newProps.error;
			this.children.errorBlock.setProps({error: newProps.error});
		}

		return super.componentDidUpdate({...oldProps, error: null}, {...newProps, error: null});
	}

	get name() {
		return this.props.name;
	}
}
