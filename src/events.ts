
const cancelledSymbol = Symbol('cancelled');
const defaultPreventedSymbol = Symbol('defaultPrevented');

export abstract class Event {
    public [cancelledSymbol]: boolean;
    public [defaultPreventedSymbol]: boolean;

    public preventDefault() {
        this[defaultPreventedSymbol] = true;
    }

    public cancel() {
        this[cancelledSymbol] = true;
    }
}

export type EventConstructor<TEvent extends Event> = new (...args: any[]) => TEvent;
