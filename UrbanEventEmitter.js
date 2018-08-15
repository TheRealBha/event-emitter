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
     * @returns {Array}
     */
    on(eventName, listener) {
        if (this._isString(eventName) && this._isFunction(listener)) {
            if (this.events[eventName]) {
                this.events[eventName].push({
                    listener: listener,
                    once: false
                });
                return this.events[eventName];
            }
            this.events[eventName] = [{
                listener: listener,
                once: false
            }];
            return this.events[eventName];
        }
        throw new TypeError('Either the event name was not of type "string" or the listener was not of type "function"');
    }

    /**
     * Registers a one time listener to a named event. If there is no
     * named event, it will create on in the events object
     *
     * @param {string} eventName
     * @param {function} listener
     * @memberof EventEmitter
     * @returns {Array}
     */
    once(eventName, listener) {
        if (this._isString(eventName) && this._isFunction(listener)) {
            if (this.events[eventName]) {
                this.events[eventName].push({
                    listener: listener,
                    once: true
                });
                return this.events[eventName];
            }
            this.events[eventName] = [{
                listener,
                once: true
            }];
            return this.events[eventName];
        }
        throw new TypeError('Either the event name was not of type "string" or the listener was not of type "function"');
    }

    /**
     * Emits the named event and executes all registered listeners for the
     * named event. If it is a one time listener, it is removed from the 
     * listeners array after execution.
     *
     * @param {string} eventName
     * @param {*} args
     * @memberof EventEmitter
     * @returns {Array}
     */
    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((listenerObject) => {
                listenerObject.listener.apply(null, args);
            });
            this.events[eventName] = this.events[eventName].filter(listenerObject => !listenerObject.once);
        }
    }

    /**
     * Clears one or multiple functions in the named events array.
     *
     * @param {string} eventName
     * @param {function} args
     * @memberof EventEmitter
     * @returns {Array}
     */
    clear(eventName, ...args) {
        this.events[eventName].filter((callback, index) => {
            args.forEach(arg => {
                if (this._isFunction(arg) && callback.listener.toString() === arg.toString()) {
                    this.events[eventName].splice(index, 1);
                }
            });
        });
        return this.events[eventName];
    }

    /**
     * Clears the listeners in the array for the specified named event.
     *
     * @param {string} eventName
     * @memberof EventEmitter
     * @returns {Array}
     */
    clearAll(eventName) {
        this.events[eventName] = [];
        return this.events[eventName];
    }

    /**
     * Utility function to check event name is type "string"
     *
     * @param {*} eventName
     * @returns {Boolean}
     * @memberof EventEmitter
     */
    _isString(eventName) {
        if (typeof eventName === 'string') {
            return true;
        }
        return false;
    }

    /**
     * Utility function to check event name is type "function"
     *
     * @param {*} eventName
     * @returns {Boolean}
     * @memberof EventEmitter
     */
    _isFunction(listener) {
        if (typeof listener === 'function') {
            return true;
        }
        return false;
    }
}

module.exports = EventEmitter;