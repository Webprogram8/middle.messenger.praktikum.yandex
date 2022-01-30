import {TValidationCheck} from '../../lib/types';

export const validatePhone: TValidationCheck = (phone: string | null) => {
	const phoneRegex = /^\+?[0-9]{10,15}$/;
	return phone && phone.match(phoneRegex) ? true : 'Incorrect phone';
};
