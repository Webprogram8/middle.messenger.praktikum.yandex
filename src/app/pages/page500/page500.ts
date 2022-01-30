import '../../layouts/main';
import {Button} from '../../components/button';
import Block from '../../lib/view/block';
import {TProps} from '../../lib/types';

import template from './page500.hbs';
import pageStyles from './page500.module.css';

export default class Page500 extends Block<TProps> {
	constructor() {
		super(
			'div',
			{
				button: new Button({
					text: 'Reload page',
					onClick: () => window.location.reload(),
				}),
				pageStyles,
			},
			template,
		);
	}
}
