import {TUser, TUserFormData} from '../lib/types';

export const prepareUserData = (userData: TUserFormData): TUser => ({
	id: userData.id,
	login: userData.login,
	email: userData.email,
	phone: userData.phone,
	avatar: userData.avatar,
	role: userData.role,
	firstName: userData.first_name,
	secondName: userData.second_name,
	displayName: userData.display_name
});
