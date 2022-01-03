import {v4 as makeUUID} from 'uuid';

import EventBus from '../../lib/event-bus';
import {TContextBase, TProps, TTemplate} from '../../lib/types';

export default abstract class Block<Props extends TProps = TProps & TContextBase> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CWM: 'flow:component-will-mount',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_RENDER: 'flow:render'
	};

	protected element: HTMLElement | null = null;

	protected tagName: string | null = null;

	protected template: TTemplate | null = null;

	props: Props;

	children: Record<string, Block> = {};

	eventBus = new EventBus();

	_id: string | null = null;

	protected constructor(tagName = 'div', propsAndChildren: TProps = {}, template?: TTemplate) {
		this.tagName = tagName;
		const {children, props} = this._getChildren(propsAndChildren);
		this.props = this.makePropsProxy(props) as Props;
		this.children = children;
		this._id = makeUUID();
		if (template) {
			this.template = template;
		}

		this.registerEvents(this.eventBus);
		this.eventBus.emit(Block.EVENTS.INIT);
	}

	_getChildren(propsAndChildren: TProps): {
		children: Record<string, Block>;
		props: TProps;
	} {
		const children: Record<string, Block> = {};
		const props: TProps = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return {children, props};
	}

	protected registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CWM, this.componentWillMountHandler);
		eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMountHandler);
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	protected createResources() {
		this.element = this.createDocumentElement();
	}

	protected init() {
		this.createResources();
		this.eventBus.emit(Block.EVENTS.FLOW_CWM);
	}

	protected componentWillMountHandler = () => {
		this.componentWillMount();
		this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
	};

	protected componentDidMountHandler = () => {
		this.componentDidMount();
	};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	componentWillMount() {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	componentDidMount() {}

	componentDidUpdate(oldProps: TProps, newProps: TProps) {
		return Object.entries(newProps).some(
			([propName, propValue]) => oldProps[propName] !== propValue
		);
	}

	setProps(newProps: TProps) {
		if (!newProps) {
			return;
		}

		if (this.componentDidUpdate(this.props, newProps)) {
			Object.assign(this.props, newProps);
			this._render();
		}
	}

	_render() {
		if (this.element) {
			const block = this.render();

			this.removeEvents();
			this.element.innerHTML = '';
			if (block) {
				this.element.appendChild(block);
				this.addEvents();
				this.eventBus.emit(Block.EVENTS.FLOW_CDM);
			}
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	addEvents() {}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	removeEvents() {}

	render() {
		if (this.template) {
			const fragment = document.createElement('template');
			fragment.innerHTML = this.template(this.context());

			Object.values(this.children).forEach((child) => {
				const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

				const childEl = child.getContent();
				if (childEl && stub) {
					stub.replaceWith(childEl);
				}
			});

			return fragment.content;
		}
		return undefined;
	}

	protected context(): TProps {
		const propsAndStubs: TProps = {...this.props, _id: this._id};

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});

		return propsAndStubs;
	}

	getContent() {
		return this.element;
	}

	makePropsProxy(props: TProps) {
		return new Proxy(props, {
			get: (target, prop) => {
				const value = target[prop.toString()];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			}
		});
	}

	createDocumentElement() {
		const element = this.tagName ? document.createElement(this.tagName) : null;
		if (element && this.props._withInternalID && this._id) {
			element.setAttribute('data-id', this._id);
		}
		return element;
	}

	toString() {
		return this.getContent()?.outerHTML;
	}
}
