import {expect} from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

import Http, {EMethod} from './http';

chai.use(sinonChai);

describe('Testing HTTPTransport module', () => {
	let request: Http;

	beforeEach(() => {
		request = new Http('http://localhost');
	});

	it('Method "get"', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.get('/test');

		expect(requestSpy).to.have.been.calledWith('/test', {method: EMethod.GET});
	});

	it('Method "post"', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.post('/test', {});

		expect(requestSpy).to.have.been.calledWith('/test', {method: EMethod.POST});
	});

	it('Method "put"', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.put('/test', {});

		expect(requestSpy).to.have.been.calledWith('/test', {method: EMethod.PUT});
	});

	it('Method "delete"', () => {
		const requestSpy = sinon.spy(request, 'request');
		request.delete('/test', {});

		expect(requestSpy).to.have.been.calledWith('/test', {method: EMethod.DELETE});
	});
});
