import Handlebars from 'handlebars';

import '../../partials/avatar';

import template from './chat-item.hbs';
import styles from './chat-item.module.css';

Handlebars.registerPartial('chat-item', (context: object, options?: RuntimeOptions) =>
	template({...context, styles}, options),
);
