import {set} from '../../utils/mydash/set';
import {TChat, TUser, TUserFormData} from '../types';

export enum StoreEvents {
	Updated = 'updated',
}

type TStore = {
	user: TUserFormData | null;
	chats: ReadonlyArray<TChat>;
	currentChatId: number | null;
	currentChatUsers: ReadonlyArray<TUser>;
	currentChatToken: string | null;
};
type TStoreUpdateHandler = (store: TStore) => void;

class Store {
	listeners: Record<string, TStoreUpdateHandler[]> = {};

	private state: TStore = {
		user: null,
		chats: [],
		currentChatId: null,
		currentChatUsers: [],
		currentChatToken: null,
	};

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown) {
		set(this.state, path, value);
		this.emit(path);
	}

	on(path: string, callback: TStoreUpdateHandler) {
		if (!this.listeners[path]) {
			this.listeners[path] = [];
		}

		this.listeners[path].push(callback);
	}

	emit(path: string) {
		Object.keys(this.listeners).forEach((eventPath) => {
			if (path.indexOf(eventPath) === 0) {
				this.listeners[eventPath].forEach((listener) => {
					listener(this.state);
				});
			}
		});
	}
}

export default new Store();
