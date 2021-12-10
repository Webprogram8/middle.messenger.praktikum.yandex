type TEventName = string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TEventHandler = (...args: any) => void;

export default class EventBus {
	listeners: Record<TEventName, TEventHandler[]> = {};

	on(event: TEventName, callback: TEventHandler) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	off(event: TEventName, callback: TEventHandler) {
		this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
	}

	emit(event: TEventName, ...args: unknown[]) {
		if (this.listeners[event]) {
			this.listeners[event].forEach((listener) => {
				listener(...args);
			});
		}
	}
}
