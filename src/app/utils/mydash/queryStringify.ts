import {Indexed} from '../../lib/types';
import {isIndexed} from '../../lib/typing/isIndexed';

function isArrayOrObject(value: unknown): value is [] | Indexed {
	return isIndexed(value) || Array.isArray(value);
}

function getKey(key: string, parentKey?: string) {
	return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: Indexed | [], parentKey?: string) {
	const result: [string, string][] = [];

	for (const [key, value] of Object.entries(data)) {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}

	return result;
}

export default function queryStringify(data: Indexed | unknown) {
	if (!isIndexed(data)) {
		throw new Error('input must be an object');
	}

	return getParams(data)
		.map((arr) => arr.join('='))
		.join('&');
}
