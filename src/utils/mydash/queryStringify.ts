type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
	key: 1,
	key2: 'test',
	key3: false,
	key4: true,
	key5: [1, 2, 3],
	key6: {a: 1},
	key7: {b: {d: 2}}
};

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
	return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

function getKey(key: string, parentKey?: string) {
	return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
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

export default function queryStringify(data: PlainObject | unknown) {
	if (!isPlainObject(data)) {
		throw new Error('input must be an object');
	}

	return getParams(data).map(arr => arr.join('=')).join('&');
}
