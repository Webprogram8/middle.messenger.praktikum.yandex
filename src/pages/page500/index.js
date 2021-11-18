import '~/src/layouts/main';
import '~/src/components/input';
import '~/src/components/button';

import template from './page500.hbs';
import * as pageStyles from './page500.module.css';

export default (context) => template({ ...context, pageStyles });
