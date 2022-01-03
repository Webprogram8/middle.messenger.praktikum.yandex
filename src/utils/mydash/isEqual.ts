import {Indexed} from '../../lib/types';

function isEqual(a: Indexed, b: Indexed): boolean {
	if (a === b) {
		return true;
	}
	if (Object.keys(a).length !== Object.keys(b).length) {
		return false;
	}

	return Object.entries(a).every(([aKey, aValue]) => {
		const bValue = b[aKey];
		return aValue === b[aKey] || (aValue && bValue && typeof aValue === 'object' && typeof bValue === 'object' && isEqual(aValue as Indexed, bValue as Indexed));
	});
}

export default isEqual;
