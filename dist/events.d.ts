declare const cancelledSymbol: unique symbol;
declare const defaultPreventedSymbol: unique symbol;
export declare abstract class Event {
    private [cancelledSymbol];
    private [defaultPreventedSymbol];
    readonly cancelled: boolean;
    readonly defaultPrevented: boolean;
    cancel(): void;
    preventDefault(): void;
}
export declare type EventConstructor<T extends Event> = new (...args: any[]) => T;
export declare type EventListener<T extends Event> = (event: T) => void;
export declare class EventDispatcher {
    private listenerMap;
    addListener<T extends Event>(constructor: EventConstructor<T>, listener: EventListener<T>): void;
    removeListener<T extends Event>(constructor: EventConstructor<T>, listener: EventListener<T>): void;
    dispatch<T extends Event>(event: T): boolean | undefined;
}
export {};
