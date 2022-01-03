// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars.runtime';

import logo from '../../../static/logo.svg';

import template from './main.hbs';
import * as styles from './main.module.css';

Handlebars.registerPartial('layout_main', (context?: object, options?: object) =>
	template({...context, styles, logo}, options)
);
