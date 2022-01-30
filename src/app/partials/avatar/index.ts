import Handlebars from "handlebars";

import template from './avatar.hbs';
import styles from './avatar.module.css';

const defaultContext = {
	avatar: 'assets/photo-stub.png',
};

Handlebars.registerPartial('avatar', (context: object, options?: RuntimeOptions) =>
	template({...defaultContext, ...context, styles}, options),
);
