import {TUserFormData} from '../lib/types';
import UserAPI from '../api/user-api';

export default class UserController {
	public static changeUser(user: TUserFormData) {
		return new Promise((resolve, reject) =>
			UserAPI.change(user)
				.then(resolve)
				.catch(({reason}) => reject(reason)),
		);
	}

	public static changePassword(oldPassword: string, newPassword: string) {
		return new Promise((resolve, reject) =>
			UserAPI.changePassword(oldPassword, newPassword)
				.then(resolve)
				.catch(({reason}) => reject(reason)),
		);
	}

	public static changeAvatar(data: FormData) {
		return new Promise((resolve, reject) =>
			UserAPI.changeAvatar(data)
				.then(resolve)
				.catch(({reason}) => reject(reason)),
		);
	}
}
