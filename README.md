Event JS
========

[![Build status](https://img.shields.io/travis/talesoft/event-js/master.svg?style=flat-square)](https://travis-ci.org/talesoft/event-js)
[![Coverage](https://img.shields.io/codeclimate/coverage/Talesoft/event-js.svg)](https://codecov.io/github/Talesoft/event-js?branch=master)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@talesoft/event.svg)](https://snyk.io/package/npm/@talesoft/event)

A minimalistic implementation of the event pattern.


Installation
------------

```bash
npm i @talesoft/event
```

TypeScript supported out-of-the-box.


Usage
-----

The library comes with a base class `Event` that will represent any kind of event
you want to hook and with an `EventDispatcher` that will manage listeners for events
and dispatch event instances to these listeners.

```js
import { Event, EventDispatcher } from '@talesoft/event';

const dispatcher = new EventDispatcher();

class ClickEvent extends Event {}

dispatcher.addListener(ClickEvent, () => {
    console.log('Clicked!');
});

dispatcher.dispatcher(new ClickEvent());
```

### Passing Event Data

```js
import { Event, EventDispatcher } from '@talesoft/event';

const dispatcher = new EventDispatcher();

class ResponseEvent extends Event {
    public content: string = '';
}

dispatcher.addListener(ResponseEvent, event => {
    event.content = 'Hello from Response!';
});

const event = new ResponseEvent();

dispatcher.dispatcher(event);

console.log(event.content); // "Hello from Response!"
```

### Cancelling events

```js
import { Event, EventDispatcher } from '@talesoft/event';

const dispatcher = new EventDispatcher();

class WalkEvent extends Event {}

dispatcher.addListener(WalkEvent, () => {
    console.log('I will be called!');
});

dispatcher.addListener(WalkEvent, event => {
    console.log('I will be called, too!');

    event.cancel();
});

dispatcher.addListener(WalkEvent, () => {
    console.log('I won\'t be called anymore.');
});

const event = new WalkEvent();

const success = dispatcher.dispatcher(event);

console.log(success); // false

console.log(event.cancelled); // true
```

### Default action prevention

```js
import { Event, EventDispatcher } from '@talesoft/event';

const dispatcher = new EventDispatcher();

class ClickEvent extends Event {}

dispatcher.addListener(ClickEvent, event => {
    event.preventDefault();
    // This is the only thing that will happen, as we'll prevent the default dispatch action
    window.location.href = 'http://other.example.com';
});

const event = new ClickEvent();
if (dispatcher.dispatch(event)) {
    // This won't happen, as dispatch will return false when the default action was prevented
    window.location.href = 'http://example.com';
}

console.log(event.defaultPrevented); // true
```


Contributing
------------

Before contributing, check out the [Contribution Guidelines][contribution-guidelines]

Requires: [npm][nodejs-download]

```bash
// Pull project
git clone https://github.com/Talesoft/event-js

// Enter project directory
cd event-js

// Install development dependencies
npm install

// ... make your changes ...

// Run tests
npm run test

// Lint
npm run lint

// Fix linting problems
npm run lint:fix

// Build
npm run build

// ... create branch, commit, push, merge request etc. ...
```

[contribution-guidelines]: https://github.com/Talesoft/event-js/blob/master/CONTRIBUTING.md
[nodejs-download]: https://nodejs.org/en/
