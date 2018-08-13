'use strict';

class EventEmitter  {
    constructor() {
        this.events = {};
    }

    on(eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName].push({
                listener: callback,
                once: false
            });
        } else {
            this.events[eventName] = [{
                listener: callback,
                once: false
            }];
        }
    }

    once(eventName, callback) {
        if(this.events[eventName]) {
            this.events[eventName].push({
                listener: callback,
                once: true
            });
        } else {
            this.events[eventName] = [{
                listener: callback,
                once: true
            }];
        }
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((callback) => {
                callback.listener.apply(null, args);
                if (callback.once) {
                    this.events[eventName] = this.events[eventName].filter(callback => !callback.once );
                }
            });
        }
    }

    clear(eventName, ...args) {
        this.events[eventName].filter((callback, index) => {
            args.forEach(arg => {
                if (callback.listener.toString() === arg.toString()) {
                    this.events[eventName].splice(index, 1);
                }
            });
        })
    }

    clearAll(eventName) {
        delete this.events[eventName];
    }
}

module.exports = EventEmitter;