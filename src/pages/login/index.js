import '~/src/layouts/main';
import '~/src/components/input';
import '~/src/components/button';

import template from './login.hbs';
import * as pageStyles from './login.module.css';

export default (context) => template({ ...context, pageStyles });
