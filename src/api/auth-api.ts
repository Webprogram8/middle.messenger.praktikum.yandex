import Http from '../lib/api/http';
import {TUserFormData} from '../lib/types';

const authAPIInstance = new Http('/api/v2/auth');

export default class AuthAPI {
	static signUp(user: TUserFormData) {
		return authAPIInstance.post<{id: number}>('/signup', {
			data: user,
		});
	}

	static signIn(login: string, password: string) {
		return authAPIInstance.post('/signin', {
			data: {login, password},
		});
	}

	static user() {
		return authAPIInstance.get<TUserFormData>('/user');
	}

	static logout() {
		return authAPIInstance.post('/logout');
	}
}
