import Http from '../lib/api/http';
import {TUserFormData} from '../lib/types';

const userAPIInstance = new Http('/api/v2/user');

export default class UserAPI {
	static change(user: TUserFormData) {
		return userAPIInstance.put<TUserFormData>('/profile', {
			data: user,
		});
	}

	static changePassword(oldPassword: string, newPassword: string) {
		return userAPIInstance.put<TUserFormData>('/password', {
			data: {oldPassword, newPassword},
		});
	}

	static changeAvatar(data: FormData) {
		return userAPIInstance.put<TUserFormData>('/profile/avatar', {
			data,
			isRaw: true,
		});
	}

	static searchByLogin(login: string) {
		return userAPIInstance.post('/search', {
			data: {login},
		});
	}
}
