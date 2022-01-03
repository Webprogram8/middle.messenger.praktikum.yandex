import Http from '../lib/api/http';
import {TUserFormData} from '../lib/types';

const authAPIInstance = new Http('/api/v2/auth');

export default class AuthAPI {
	static headers() {
		return {
			credentials: 'include',
			mode: 'cors',
			'Content-Type': 'application/json'
		};
	}

	static signUp(user: TUserFormData) {
		return authAPIInstance.post<{id: number}>('/signup', {
			headers: this.headers(),
			data: user
		});
	}

	static signIn(login: string, password: string) {
		return authAPIInstance.post('/signin', {
			data: {login, password},
			headers: this.headers()
		});
	}

	static user() {
		return authAPIInstance.get<TUserFormData>('/user', {
			headers: this.headers()
		});
	}

	static logout() {
		return authAPIInstance.post('/logout');
	}
}
