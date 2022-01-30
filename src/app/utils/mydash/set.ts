import {Indexed} from '../../lib/types';
import {isIndexed} from '../../lib/typing/isIndexed';

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
	if (!isIndexed(object)) {
		return object;
	}
	let currentObj = object;
	const pathArr = path.split('.');
	pathArr.forEach((pathChunk, index) => {
		if (index === pathArr.length - 1) {
			// @ts-ignore
			currentObj[pathChunk] = value;
			return;
		}
		if (currentObj[pathChunk] === undefined) {
			// @ts-ignore
			currentObj[pathChunk] = {};
		}
		// @ts-ignore
		currentObj = currentObj[pathChunk];
	});
}
