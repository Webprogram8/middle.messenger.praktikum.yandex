import Block from '../view/block';

export const mountView = (selector: string, view: Block) => {
	document.querySelector(selector)?.replaceChildren(view.getContent() ?? '');
};
