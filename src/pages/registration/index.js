import '~/src/layouts/main';
import '~/src/components/input';
import '~/src/components/button';

import template from './registration.hbs';
import * as pageStyles from './registration.module.css';

export default (context) => template({ ...context, pageStyles });
