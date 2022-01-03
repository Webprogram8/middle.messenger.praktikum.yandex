import {TValidationCheck} from '../../lib/types';

export const validateEmail: TValidationCheck = (email: string | null) => {
	const emailRegex = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]{2,}\.[a-zA-Z0-9-]+$/;
	return email && email.match(emailRegex) ? true : 'Incorrect email';
};
