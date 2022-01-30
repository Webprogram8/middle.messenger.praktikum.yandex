import {TClass, TDOMSelector} from '../types';
import Block from '../view/block';
import {mountView} from '../dom/mountView';

export default class Route {
	protected pathname: string;
	protected blockClass: TClass<Block>;
	protected block: Block | null;

	constructor(pathname: string, view: TClass<Block>) {
		this.pathname = pathname;
		this.blockClass = view;
		this.block = null;
	}

	leave() {
		if (this.block) {
			this.block.remove();
			this.block = null;
		}
	}

	match(pathname: string) {
		return pathname === this.pathname;
	}

	render(rootQuery: string) {
		if (!this.block) {
			this.block = new this.blockClass();
			mountView(rootQuery, this.block);
		}
	}

	get blockClassName() {
		return this.blockClass;
	}
}
