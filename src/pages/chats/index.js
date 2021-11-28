import '~/src/layouts/main';
import '~/src/components/input';
import '~/src/components/button';

import template from './chats.hbs';
import * as pageStyles from './chats.module.css';

export default (context) => template({ ...context, pageStyles });
