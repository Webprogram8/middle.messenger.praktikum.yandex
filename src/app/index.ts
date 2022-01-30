import Handlebars from 'handlebars';

import './site.scss';
import {Router} from './lib/routing/router';
import routes, {URLS} from './routes';
import {Page404} from './pages/page404';
import AuthAPI from './api/auth-api';
import store from './lib/data/store';
import {resourceUrl} from './constants';
import AuthController from './controllers/AuthController';
import {prepareUserData} from './utils/prepareUserData';

const rootSelector = '#root';

Handlebars.registerHelper('resourceUrl', (url: string) => `${resourceUrl}${url}`);

document.addEventListener('DOMContentLoaded', () => {
	const router = Router.instance();
	Object.entries(routes).forEach(([url, block]) => router.use(url, block));
	router.set404(Page404);

	if (document.location.pathname === URLS.logout) {
		AuthController.logout();
		router.go(URLS.login);
	}

	AuthAPI.user()
		.then((user) => {
			store.set('user', prepareUserData(user));
			router.start(rootSelector);
			if (document.location.pathname === URLS.login) {
				router.go(URLS.chats);
			}
		})
		.catch((e) => {
			if (document.location.pathname !== URLS.registration) {
				router.start(rootSelector, URLS.login);
			} else {
				router.start(rootSelector);
			}
		});
});
