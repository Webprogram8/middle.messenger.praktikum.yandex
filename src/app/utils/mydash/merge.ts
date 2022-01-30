import {Indexed} from '../../lib/types';
import {isIndexed} from '../../lib/typing/isIndexed';

function merge(lhs: Indexed, rhs: Indexed): Indexed {
	const result = Object.assign({}, lhs, rhs);

	Object.entries(lhs).forEach(([lKey, lValue]) => {
		const rValue = rhs[lKey];
		if (isIndexed(lValue) && isIndexed(rValue)) {
			result[lKey] = merge(lValue, rValue);
		}
	});

	return result;
}

export default merge;
