# Event Emitter

Custom event emitter module that will register events and listeners to the specified event and execute if the event is emitted. It will also register one time events, remove specific listeners from the named event, or remove all listeners for a named event.

## Getting Started

```
    const EventEmitter = require('event-emitter');
    const EE = new EventEmitter();

## API

### .on
Will register listeners to a named event. If there is no existing named event, it will create a new named event and add the listener.
```
    EE.on('eventName', () => {});

    const customListener = (message) => console.log(message);
    EE.on('eventName', customListener);

````

### .once
This will register a once time listener to a named event. If there is no existing named event, it will create a new named event and add the listener. After the named event is emitted, the one time listener will be removed after it is executed.
```
    const customListener = (message) => console.log(message);
    EE.once('eventName', customListener);

````

### .emit
Using emit will trigger all the listeners for the named event. Any arguments necessary for the listeners should be added after the name of the event.
After each listener is triggered, it will check if it is a one time listener and unregister the listener from the list if it is.
```
    EE.emit('eventName', 'Hi, the event was emitted');

````

### .clear
If a specific listener needs to be removed, specify the named event and the function that needs to be removed.
```
    const customListener = (message) => console.log(message);

    EE.on('eventName', customListener);

    const EE.clear('eventName', customListener);

````

### .clearAll
To unregister all listeners use .clearAll to clear the list. Specify which named event to do this for.
```
    const EE.clearAll('eventName');

````