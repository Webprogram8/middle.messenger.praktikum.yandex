import {Indexed} from '../types';

export function isIndexed(obj: unknown): obj is Indexed {
	return obj !== null && typeof obj === 'object';
}
