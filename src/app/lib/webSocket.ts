import EventBus from './event-bus';

export enum EWebSocketEvents {
	Open = 'open',
	Message = 'message',
	Error = 'error',
	Close = 'close',
}

class WebSocketService extends EventBus {
	private socket?: WebSocket;
	private eventBus = new EventBus();

	connect(userId?: string, chatId?: number, chatToken?: string) {
		if (userId && chatId && chatToken) {
			this.socket?.close();
			this.socket = new WebSocket(
				`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${chatToken}`,
			);
			this.socket.addEventListener('open', this.onOpen.bind(this));
			this.socket.addEventListener('message', this.onMessage.bind(this));
			this.socket.addEventListener('error', this.onError.bind(this));
			this.socket.addEventListener('close', this.onClose.bind(this));
		}
	}

	send(content: string, type = 'message') {
		console.log('Message sent');
		this.socket?.send(JSON.stringify({content, type}));
	}

	onOpen() {
		this.eventBus.emit(EWebSocketEvents.Open);
		// console.log('Connection established');
		this.send('0', 'get old');
	}

	onMessage(event: any) {
		this.eventBus.emit(EWebSocketEvents.Message, event);
		// console.log('Data received: ', event);
		// return JSON.parse(event.data);
	}

	onError(event: any) {
		this.eventBus.emit(EWebSocketEvents.Error);
		// console.log('Error: ', event.message);
	}

	onClose(event: any) {
		this.eventBus.emit(EWebSocketEvents.Close);
		if (event.wasClean) {
			console.log('Connection closed');
		} else {
			console.log('Connection interrupted');
		}
		console.log(`Event code: ${event.code}`);
		console.log(`Event reason: ${event.reason}`);
	}

	on<T extends Event>(event: EWebSocketEvents, callback: (event: T) => void) {
		this.eventBus.on(event, callback);
	}
}

export default new WebSocketService();
