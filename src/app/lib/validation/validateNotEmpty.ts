import {TValidationCheck} from '../../lib/types';

export const validateNotEmpty: TValidationCheck = (value: string | null) =>
	Boolean(value) || 'Required';
