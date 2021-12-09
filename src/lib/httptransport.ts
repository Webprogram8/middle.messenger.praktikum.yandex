enum EMethod {
    GET = 'GET',
    PUT =  'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type THeaders = Record<string, string>;

type TOptions = Partial<{
  data: URLSearchParams;
  method: EMethod;
  headers: THeaders;
  timeout: number;
}>;

function queryStringify(data: URLSearchParams) {
    return Object.entries(data).map(([paramName, paramValue]) => `${paramName}=${paramValue}`).join('&');
}

class HTTPTransport {
    get = (url: string, options: TOptions = {}) => {
        if (options.data) {
            url = url + '?' + queryStringify(options.data);
            delete options.data;
        }
        return this.request(url, {...options, method: EMethod.GET}, options.timeout);
    };

    // PUT, POST, DELETE
    put = async (url: string, options: TOptions = {}) => {
        await this.request(url, {...options, method: EMethod.PUT}, options.timeout)
    }

    post = async (url: string, options: TOptions = {}) => {
        await this.request(url, {...options, method: EMethod.POST}, options.timeout)
    }

    delete = async (url: string, options: TOptions = {}) => {
        await this.request(url, {...options, method: EMethod.DELETE}, options.timeout)
    }

    request = (url: string, options: TOptions, timeout = 5000) => {
        const {method = EMethod.GET, data, headers} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            if (headers) {
                Object.entries(headers).forEach(([headerName, headerValue]) => {
                    xhr.setRequestHeader(headerName, headerValue);
                });
            }
            xhr.timeout = timeout;

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === EMethod.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}