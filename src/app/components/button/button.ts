import Block from '../../lib/view/block';
import {TContextBase, TStyles} from '../../lib/types';

import template from './button.hbs';
import styles from './button.module.css';

type TProps = Partial<{
	onClick: () => void;
	type: 'submit' | 'reset' | 'button';
	text: string;
	styles: TStyles;
}> &
	TContextBase;

export default class Button extends Block<TProps> {
	constructor(props: TProps = {}) {
		super('button', {...props, styles}, template);
	}

	createDocumentElement() {
		const element = super.createDocumentElement();
		if (this.props.onClick && element) {
			element.addEventListener('click', this.props.onClick);
		}
		element?.classList.add(styles.root);
		return element;
	}
}
