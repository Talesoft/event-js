
export type EventConstructor<T extends Event> = new (...args: any[]) => T;
export type EventListener<T extends Event> = (event: T) => void;

const cancelledSymbol = Symbol('cancelled');
const defaultPreventedSymbol = Symbol('defaultPrevented');

export abstract class Event {
    private [cancelledSymbol]: boolean = false;
    private [defaultPreventedSymbol]: boolean = false;

    get cancelled() {
        return this[cancelledSymbol];
    }

    get defaultPrevented(){
        return this[defaultPreventedSymbol];
    }

    public cancel() {
        this[cancelledSymbol] = true;
    }

    public preventDefault() {
        this[defaultPreventedSymbol] = true;
    }
}

export class EventDispatcher {
    private listenerMap: Map<EventConstructor<Event>, Array<EventListener<Event>>> = new Map();

    public addListener<T extends Event>(constructor: EventConstructor<T>, listener: EventListener<T>) {
        if (!this.listenerMap.has(constructor)) {
            this.listenerMap.set(constructor, []);
        }
        const listeners = this.listenerMap.get(constructor) as Array<EventListener<T>>;
        listeners.push(listener);
    }

    public removeListener<T extends Event>(constructor: EventConstructor<T>, listener: EventListener<T>) {
        if (!this.listenerMap.has(constructor)) {
            return;
        }
        const listeners = this.listenerMap.get(constructor) as Array<EventListener<T>>;
        const index = listeners.indexOf(listener);
        if (index === -1) {
            return;
        }
        listeners.splice(index, 1);
    }

    public dispatch<T extends Event>(event: T) {
        const listeners = this.listenerMap.get(event.constructor as EventConstructor<T>);
        if (listeners) {
            for (let i = 0; i < listeners.length; i += 1) {
                const listener = listeners[i];
                listener(event);
                if (event.cancelled) {
                    break;
                }
            }
        }
        return !(event.cancelled || event.defaultPrevented);
    }
}
