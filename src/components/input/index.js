import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './input.hbs';
import * as styles from './input.module.css';

const defaultContext = {
  type: 'text',
};

Handlebars.registerPartial('input', (context, options) => template({ ...defaultContext, ...context, styles }, options));
