import Http from '../lib/api/http';
import {TUserFormData} from '../lib/types';

const userAPIInstance = new Http('/api/v2/user');

export default class UserAPI {
	static headers() {
		return {
			credentials: 'include',
			mode: 'cors',
			'Content-Type': 'application/json'
		};
	}

	static change(user: TUserFormData) {
		return userAPIInstance.put<TUserFormData>('/profile', {
			headers: this.headers(),
			data: user
		});
	}

	static changePassword(oldPassword: string, newPassword: string) {
		return userAPIInstance.put<TUserFormData>('/password', {
			headers: this.headers(),
			data: {oldPassword, newPassword}
		});
	}

	static changeAvatar(data: FormData) {
		return userAPIInstance.put<TUserFormData>('/profile/avatar', {
			data,
			isRaw: true
		});
	}

	static searchByLogin(login: string) {
		return userAPIInstance.post('/search', {
			headers: this.headers(),
			data: {login}
		});
	}
}
