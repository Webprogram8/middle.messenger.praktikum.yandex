import {TUser, TUserFormData} from '../lib/types';

export const makeUserData = (userData: TUser): TUserFormData => ({
	id: userData.id,
	login: userData.login,
	email: userData.email,
	phone: userData.phone,
	avatar: userData.avatar,
	role: userData.role,
	first_name: userData.firstName,
	second_name: userData.secondName,
	display_name: userData.displayName,
});
