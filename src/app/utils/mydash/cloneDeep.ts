function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

export default function cloneDeep<T extends object = object>(obj: T): T {
	if (isArray(obj)) {
		return [...obj].map((item) => (typeof item === 'object' ? cloneDeep(item) : item)) as T;
	}
	const result: Record<string, unknown> = Object.assign({}, obj);
	Object.entries(result).forEach(([key, value]) => {
		if (typeof value === 'object' && value) {
			result[key] = cloneDeep(value);
		}
	});
	return result as T;
}
