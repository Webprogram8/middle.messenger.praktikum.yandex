export const last = (list: Array<unknown>) =>
	Array.isArray(list) ? list[list.length - 1] : undefined;
