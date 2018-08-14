'use strict';
/**
 * Creates a new EventEmitter class that can register functions to events,
 * emit an event to trigger the registered functions, and remove functions
 * from an event.
 *
 * @class EventEmitter
 */
class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Register listeners to named events. If no named event exists it will create
     * it in the events object.
     *
     * @param {string} eventName
     * @param {function} listener
     * @memberof EventEmitter
     */
    on(eventName, listener) {
        if (this.events[eventName]) {
            this.events[eventName].push({
                listener: listener,
                once: false
            });
        } else {
            this.events[eventName] = [{
                listener: listener,
                once: false
            }];
        }
    }

    /**
     * Registers a one time listener to a named event. If there is no
     * named event, it will create on in the events object
     *
     * @param {string} eventName
     * @param {function} listener
     * @memberof EventEmitter
     */
    once(eventName, listener) {
        if (this.events[eventName]) {
            this.events[eventName].push({
                listener: listener,
                once: true
            });
        } else {
            this.events[eventName] = [{
                listener: listener,
                once: true
            }];
        }
    }

    /**
     * Emits the named event and executes all registered listers for the
     * named event. If it is a one time listener, it is removed from the 
     * listeners array after execution.
     *
     * @param {string} eventName
     * @param {*} args
     * @memberof EventEmitter
     */
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((listener) => {
                listener.listener.apply(null, args);
                if (listener.once) {
                    this.events[eventName] = this.events[eventName].filter(listenerObject => !listenerObject.once);
                }
            });
        }
    }

    /**
     * Clears one or multiple functions in the named events array.
     *
     * @param {string} eventName
     * @param {function} args
     * @memberof EventEmitter
     */
    clear(eventName, ...args) {
        this.events[eventName].filter((callback, index) => {
            args.forEach(arg => {
                if (callback.listener.toString() === arg.toString()) {
                    this.events[eventName].splice(index, 1);
                }
            });
        })
    }

    /**
     * Clears the listeners in the array for the specified named event.
     *
     * @param {string} eventName
     * @memberof EventEmitter
     */
    clearAll(eventName) {
        delete this.events[eventName];
    }
}

module.exports = EventEmitter;