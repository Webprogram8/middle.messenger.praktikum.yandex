import Handlebars from 'handlebars/dist/handlebars.runtime';
import template from './main.hbs';
import * as styles from './main.module.css';
import logo from '~/static/logo.svg';

Handlebars.registerPartial('layout_main', (context, options) => template({ ...context, styles, logo }, options));
