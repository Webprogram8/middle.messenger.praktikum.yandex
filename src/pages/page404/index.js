import '~/src/layouts/main';
import '~/src/components/input';
import '~/src/components/button';

import template from './page404.hbs';
import * as pageStyles from './page404.module.css';

export default (context) => template({ ...context, pageStyles });
