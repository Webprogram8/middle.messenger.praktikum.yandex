import {assert} from 'chai';
import {Router} from './router';
import Block from '../view/block';
import {JSDOM} from 'jsdom';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>', {
	url: 'http://localhost:3000/'
});

(global as any).window = dom.window;
(global as any).document = dom.window.document;

describe('Router', () => {
	class Page1 extends Block {
		constructor() {
			super('div');
		}
	}
	class Page2 extends Block {
		constructor() {
			super('div');
		}
	}
	class Page3 extends Block {
		constructor() {
			super('div');
		}
	}
	class Page404 extends Block {
		constructor() {
			super('span');
		}
	}

	function createDefaultRouter() {
		return (new Router()).use('/page1', Page1).use('/page2', Page2).use('/page3', Page3).set404(Page404);
	}

	beforeEach(function () {
		document.body.textContent = '';
	});

	it('Start routing', () => {
		const router = createDefaultRouter();
		router.start('body', '/page1');
		assert.equal(router.currentRoute?.blockClassName, Page1);
		assert.equal(document.body.getElementsByTagName('div').length, 1);
	});

	it('Check 404 page', () => {
		const router = createDefaultRouter();
		router.start('body', '/page123');
		assert.equal(router.currentRoute?.blockClassName, undefined);
		assert.equal(document.body.getElementsByTagName('span').length, 1);
	});

	it('Check routing existing page', () => {
		const router = createDefaultRouter();
		router.start('body', '/page3');
		assert.equal(router.currentRoute?.blockClassName, Page3);
		assert.equal(document.body.getElementsByTagName('div').length, 1);
	});

	it('Check go method', () => {
		const router = createDefaultRouter();
		router.start('body', '/page1');
		assert.equal(router.currentRoute?.blockClassName, Page1);
		router.go('/page3');
		assert.equal(router.currentRoute?.blockClassName, Page3);
	});
});
