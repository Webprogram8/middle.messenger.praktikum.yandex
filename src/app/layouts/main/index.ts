import Handlebars from 'handlebars';

import template from './main.hbs';
import '../../site.scss';
import styles from './main.module.css';

Handlebars.registerPartial('layout_main', (context: object, options?: RuntimeOptions) =>
	template({...context, styles, logo: 'assets/logo.svg'}, options),
);
