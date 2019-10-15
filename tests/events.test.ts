import {Event, EventDispatcher} from '../src/events';

class TestEvent extends Event {
}

class OtherTestEvent extends Event {
}

describe('Event', () => {
    describe('defaultPrevented', () => {
        it('should return false by default', () => {
            const event = new TestEvent();
            expect(event.defaultPrevented).toBe(false);
        });
        it('should return true when preventDefault() was called', () => {
            const event = new TestEvent();
            event.preventDefault();
            expect(event.defaultPrevented).toBe(true);
        });
    });
    describe('cancelled', () => {
        it('should return false by default', () => {
            const event = new TestEvent();
            expect(event.cancelled).toBe(false);
        });
        it('should return true when cancel() was called', () => {
            const event = new TestEvent();
            event.cancel();
            expect(event.cancelled).toBe(true);
        });
    });
});

describe('EventDispatcher', () => {
    describe('addListener', () => {
        it('should correctly register an EventListener', () => {
            const dispatcher = new EventDispatcher();
            const listener = jest.fn();
            dispatcher.addListener(TestEvent, listener);
            expect(listener).toHaveBeenCalledTimes(0);
            const event = new TestEvent();
            dispatcher.dispatch(event);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(event);
        });
    });
    describe('removeListener', () => {
        it('should correctly remove an EventListener', () => {
            const dispatcher = new EventDispatcher();
            const listener = jest.fn();
            dispatcher.addListener(TestEvent, listener);
            expect(listener).toHaveBeenCalledTimes(0);
            const event = new TestEvent();
            dispatcher.dispatch(event);
            expect(listener).toHaveBeenCalledTimes(1);
            expect(listener).toHaveBeenCalledWith(event);
            dispatcher.removeListener(TestEvent, listener);
            dispatcher.dispatch(event);
            expect(listener).toHaveBeenCalledTimes(1);
        });
        it('should not throw an error when removing a listener for an unused event', () => {
            const dispatcher = new EventDispatcher();
            expect(() => dispatcher.removeListener(TestEvent, () => {})).not.toThrow();
        });
        it('should not throw an error when removing a listener that is not registered', () => {
            const dispatcher = new EventDispatcher();
            const listener = () => {};
            dispatcher.addListener(TestEvent, listener);
            dispatcher.removeListener(TestEvent, listener);
            expect(() => dispatcher.removeListener(TestEvent, listener)).not.toThrow();
        });
    });
    describe('dispatch', () => {
        it('should correctly dispatch multiple event instances', () => {
            const dispatcher = new EventDispatcher();
            const listener = jest.fn();
            dispatcher.addListener(TestEvent, listener);
            const event1 = new TestEvent();
            const event2 = new TestEvent();
            dispatcher.dispatch(event1);
            dispatcher.dispatch(event2);
            expect(listener).toHaveBeenNthCalledWith(1, event1);
            expect(listener).toHaveBeenNthCalledWith(2, event2);
        });
        it('should not call listener when not listening on event', () => {
            const otherEvent = new OtherTestEvent();
            const dispatcher = new EventDispatcher();
            const listener = jest.fn();
            dispatcher.addListener(TestEvent, listener);
            dispatcher.dispatch(otherEvent);
            expect(listener).toHaveBeenCalledTimes(0c);
        });
    });
});
