import AuthAPI from '../api/auth-api';
import {TUserFormData} from '../lib/types';
import {Router} from '../lib/routing/router';
import {URLS} from '../routes';
import store from '../lib/data/store';
import {prepareUserData} from '../utils/prepareUserData';

export default class AuthController {
	public static async signUp(user: TUserFormData) {
		try {
			await AuthAPI.signUp(user);
			await AuthAPI.user();
		} catch (e) {
			throw (e as {reason: string}).reason;
		}
	}

	public static async signIn(login: string, password: string) {
		await AuthAPI.signIn(login, password);
		const user = await AuthAPI.user();
		console.log(user);
		store.set('user', prepareUserData(user));
		Router.instance().go(URLS.chats);
	}

	public static logout() {
		return AuthAPI.logout();
	}
}
