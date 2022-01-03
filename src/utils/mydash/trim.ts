export function trim(str: string, symbols?: string) {
	if (!symbols || symbols === ' ') {
		return str.trim();
	}
	const symbolsList = symbols.split('');
	let start = 0;
	let end = str.length - 1;
	while (symbolsList.includes(str[start])) {
		start++;
	}
	while (symbolsList.includes(str[end])) {
		end--;
	}
	return end >= start ? str.slice(start, end + 1) : '';
}
