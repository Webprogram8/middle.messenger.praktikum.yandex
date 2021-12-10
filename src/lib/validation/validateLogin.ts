import {TValidationCheck} from '../../lib/types';

export const validateLogin: TValidationCheck = (login: string | null) => {
	const loginRegex = /^[a-zA-Z0-9-_]{3,20}$/;
	const onlyNumbers = /^[0-9]+$/;
	return login && login.match(loginRegex) && !login.match(onlyNumbers) ? true : 'Incorrect login';
};
