import './site.css';
import {Router} from './lib/routing/router';
import routes, {URLS} from './routes';
import {Page404} from './pages/page404';
import AuthAPI from './api/auth-api';
import store from './lib/data/store';
import {LoginPage} from './pages/login';

const rootSelector = '#root';

document.addEventListener('DOMContentLoaded', () => {
	const router = Router.instance();
	Object.entries(routes).forEach(([url, block]) => router.use(url, block));
	router.set404(Page404);

	AuthAPI.user()
		.then((user) => {
			store.set('user', user);
			router.start(rootSelector);
			if (router.currentRoute?.blockClassName === LoginPage) {
				router.go(URLS.chats);
			}
		})
		.catch(() => {
			if (document.location.pathname !== URLS.registration) {
				router.start(rootSelector, URLS.login);
			} else {
				router.start(rootSelector);
			}
		});
});
