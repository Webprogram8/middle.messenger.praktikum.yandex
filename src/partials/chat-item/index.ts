// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars.runtime';

import '../../partials/avatar';

import template from './chat-item.hbs';
import * as styles from './chat-item.module.css';

Handlebars.registerPartial('chat-item', (context: object, options: object) =>
	template({...context, styles}, options)
);
