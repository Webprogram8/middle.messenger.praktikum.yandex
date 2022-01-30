import Handlebars from 'handlebars';

import '../../partials/mini-avatar';

import template from './chat-message.hbs';
import styles from './chat-message.module.css';

const defaultContext = {
	avatar: 'assets/photo-stub.png',
};

Handlebars.registerPartial('chat-message', (context: object, options?: RuntimeOptions) =>
	template({...defaultContext, ...context, styles}, options),
);
