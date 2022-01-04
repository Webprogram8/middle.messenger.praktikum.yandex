import {assert, expect} from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {JSDOM} from 'jsdom';

import Block from './block';
import {mountView} from '../dom/mountView';

chai.use(sinonChai);

class TestBlock extends Block {
	constructor() {
		super('div');
	}
}

const dom = new JSDOM('<!DOCTYPE html><html><body><div class="app"></div></body></html>', {
	url: 'http://localhost:3000/',
});

(global as any).window = dom.window;
(global as any).document = dom.window.document;

describe('Testing Block module', () => {
	beforeEach(function () {
		document.body.textContent = '';
	});

	it('Function "mountView" should render test component', () => {
		mountView('body', new TestBlock());
		assert.equal(document.body.getElementsByTagName('div').length, 1);
	});

	it('Changing props should trigger "render" method', () => {
		const newProp = {text: 'test'};
		const testBlock = new TestBlock();
		const renderSpy = sinon.spy(testBlock, 'render');
		testBlock.setProps(newProp);
		expect(renderSpy).to.have.been.called;
	});
});
