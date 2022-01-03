import '../../layouts/main';
import '../../components/input';
import '../../components/button';
import Block from '../../lib/view/block';
import {TProps} from '../../lib/types';

import template from './page404.hbs';
import * as pageStyles from './page404.module.css';

export default class Page404 extends Block<TProps> {
	constructor() {
		super('div', {pageStyles}, template);
	}
}
