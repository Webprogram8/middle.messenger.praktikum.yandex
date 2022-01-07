import {TClass, TDOMSelector} from '../types';
import Route from './route';
import Block from '../view/block';
import {mountView} from '../dom/mountView';

export class Router {
	protected static routerObj: Router;
	protected currentRouteObj?: Route;
	routes: Array<Route> = [];
	history = window.history;
	rootQuery?: TDOMSelector;

	block404?: TClass<Block>;

	public static instance() {
		if (!Router.routerObj) {
			Router.routerObj = new Router();
		}
		return Router.routerObj;
	}

	set404(block: TClass<Block>) {
		this.block404 = block;

		return this;
	}

	use(pathname: string, block: TClass<Block>) {
		const route = new Route(pathname, block);
		this.routes.push(route);

		return this;
	}

	start(rootQuery: TDOMSelector, path = document.location.pathname) {
		this.rootQuery = rootQuery;
		window.onpopstate = () => {
			this.onRoute();
		};

		this.onRoute(path);

		return this;
	}

	onRoute(pathname: string = document.location.pathname) {
		if (this.currentRouteObj) {
			this.currentRouteObj.leave();
		}

		const route = this.getRoute(pathname);
		if (route && this.rootQuery) {
			this.currentRouteObj = route;
			route.render(this.rootQuery);
		} else if (!route && this.block404 && this.rootQuery) {
			mountView(this.rootQuery, new this.block404());
		}
	}

	go(pathname: string) {
		this.history.pushState({}, '', pathname);
		this.onRoute(pathname);

		return this;
	}

	back() {
		this.history.back();
		this.onRoute();

		return this;
	}

	forward() {
		this.history.forward();
		this.onRoute();

		return this;
	}

	getRoute(pathname: string) {
		return this.routes.find((route) => route.match(pathname));
	}

	get currentRoute() {
		return this.currentRouteObj;
	}
}
