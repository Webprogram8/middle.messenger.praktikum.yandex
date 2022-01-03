import AuthAPI from '../api/auth-api';
import {TUserFormData} from '../lib/types';
import {Router} from '../lib/routing/router';
import {URLS} from '../routes';
import store from '../lib/data/store';

export default class AuthController {
	public static signUp(user: TUserFormData) {
		return new Promise((resolve, reject) =>
			AuthAPI.signUp(user)
				.then(() => {
					AuthAPI.user()
						.then(resolve);
				})
				.catch(({reason}) => reject(reason))
		);
	}

	public static signIn(login: string, password: string) {
		return new Promise((resolve, reject) => AuthAPI.signIn(login, password).then(() => {
			AuthAPI.user()
				.then((user) => {
					store.set('user', user);
					Router.instance().go(URLS.chats);
					resolve(true);
				});
		}).catch(({response}) => {
			reject(response.reason);
		}));
	}

	public static logout() {
		return AuthAPI.logout();
	}
}
