import Handlebars from 'handlebars';

import template from './mini-avatar.hbs';
import styles from './mini-avatar.module.css';

const defaultContext = {
	avatar: 'assets/photo-stub.png',
};

Handlebars.registerPartial('mini-avatar', (context: object, options?: RuntimeOptions) =>
	template({...defaultContext, ...context, styles}, options),
);
