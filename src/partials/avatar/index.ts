// @ts-ignore
import Handlebars from 'handlebars/dist/handlebars.runtime';

import avatarStub from '~/static/photo-stub.png';

import template from './avatar.hbs';
import * as styles from './avatar.module.css';

const defaultContext = {
  avatar: avatarStub,
};

Handlebars.registerPartial('avatar', (context: object, options: object) => template({ ...defaultContext, ...context, styles }, options));
