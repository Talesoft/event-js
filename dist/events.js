"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const cancelledSymbol = Symbol('cancelled');
const defaultPreventedSymbol = Symbol('defaultPrevented');
class Event {
    constructor() {
        this[_a] = false;
        this[_b] = false;
    }
    get cancelled() {
        return this[cancelledSymbol];
    }
    get defaultPrevented() {
        return this[defaultPreventedSymbol];
    }
    cancel() {
        this[cancelledSymbol] = true;
    }
    preventDefault() {
        this[defaultPreventedSymbol] = true;
    }
}
exports.Event = Event;
_a = cancelledSymbol, _b = defaultPreventedSymbol;
class EventDispatcher {
    constructor() {
        this.listenerMap = new Map();
    }
    addListener(constructor, listener) {
        if (!this.listenerMap.has(constructor)) {
            this.listenerMap.set(constructor, []);
        }
        const listeners = this.listenerMap.get(constructor);
        listeners.push(listener);
    }
    removeListener(constructor, listener) {
        if (!this.listenerMap.has(constructor)) {
            return;
        }
        const listeners = this.listenerMap.get(constructor);
        const index = listeners.indexOf(listener);
        if (index === -1) {
            return;
        }
        listeners.splice(index, 1);
    }
    dispatch(event) {
        const listeners = this.listenerMap.get(event.constructor);
        if (listeners && !event.cancelled) {
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
exports.EventDispatcher = EventDispatcher;
