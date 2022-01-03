import {apiHost} from '../../constants';

export enum EMethod {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE'
}

type THeaders = Record<string, string>;

type TOptions = Partial<{
	data: unknown;
	method: EMethod;
	headers: THeaders;
	timeout: number;
	credentials: string;
	mode: string;
	isRaw: boolean;
}>;

function queryStringify(data: Record<string, unknown>) {
	return Object.entries(data)
		.map(([paramName, paramValue]) => {
			let value = paramValue;
			if (!value && (value === null || value === undefined || isNaN(value as number))) {
				value = '';
			}
			return `${paramName}=${value}`;
		})
		.join('&');
}

export default class Http {
	private prefix: string;

	constructor(prefix: string) {
		this.prefix = prefix;
	}

	private makeUrl = (url: string) => {
		return apiHost + this.prefix + url;
	};

	get = <Response extends object>(url: string, options: TOptions = {}) => {
		if (options.data) {
			url = `${url}?${queryStringify(options.data as Record<string, string>)}`;
			delete options.data;
		}
		return this.request<Response>(url, {...options, method: EMethod.GET}, options.timeout);
	};

	// PUT, POST, DELETE
	put = <Response extends object>(url: string, options: TOptions = {}) => {
		return this.request<Response>(url, {...options, method: EMethod.PUT}, options.timeout);
	};

	post = <Response extends object>(url: string, options: TOptions = {}): Promise<Response> => {
		return this.request<Response>(url, {...options, method: EMethod.POST}, options.timeout);
	};

	delete = <Response extends object>(url: string, options: TOptions = {}) => {
		return this.request<Response>(url, {...options, method: EMethod.DELETE}, options.timeout);
	};

	request = <Response extends object>(
		url: string,
		options: TOptions,
		timeout = 5000
	): Promise<Response> => {
		const {
			method = EMethod.GET,
			data,
			headers = !options.isRaw ? {'Content-Type': 'application/json'} : {},
			isRaw
		} = options;
		console.log('options', options);

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, this.makeUrl(url));
			xhr.withCredentials = true;

			if (headers) {
				Object.entries(headers).forEach(([headerName, headerValue]) => {
					xhr.setRequestHeader(headerName, headerValue);
				});
			}
			xhr.timeout = timeout;

			xhr.onload = function () {
				const response =
					xhr.response && xhr.response[0] === '{'
						? JSON.parse(xhr.response)
						: xhr.response;
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(response);
				} else {
					reject(response);
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === EMethod.GET || !data) {
				xhr.send();
			} else {
				// @ts-ignore
				xhr.send(isRaw ? data : JSON.stringify(data));
			}
		});
	};
}
