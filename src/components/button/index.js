import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './button.hbs';
import * as styles from './button.module.css';

Handlebars.registerPartial('button', (context, options) => template({ ...context, styles }, options));
