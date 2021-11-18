import '~/src/layouts/main';
import '~/src/components/input';
import '~/src/components/button';

import template from './account.hbs';
import * as pageStyles from './account.module.css';

export default (context) => template({ ...context, pageStyles });
