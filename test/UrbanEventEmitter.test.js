'use strict';

const UrbanEventEmitter = require('../UrbanEventEmitter');

const EE = new UrbanEventEmitter();

describe('EventEmitter', () => {
    const mockCallBack = jest.fn();
    const mockCallBack2 = jest.fn();

    beforeEach(() => {
        mockCallBack.mockClear();
        mockCallBack2.mockClear();
    })

    it('should register handler functions for named events', () => {
        EE.on('testEvent', mockCallBack);
        EE.on('testEvent', mockCallBack2);
        expect(EE.events['testEvent'].length).toBe(2);
    });

    it('should throw an error if the event name is not of type string', () => { 
        expect(() => EE.on([], mockCallBack)).toThrow(TypeError);
        expect(() => EE.once([], mockCallBack)).toThrow(TypeError);
    });

    it('should throw an error if the event name is not of type function', () => { 
        expect(() => EE.on('test', {})).toThrow(TypeError);
        expect(() => EE.once('test', {})).toThrow(TypeError);
    });

    it('should register "one-time" handler that will be called at most one time.', () => {

        EE.on('testEvent', mockCallBack2)
        EE.once('testEvent', mockCallBack);
        expect(EE.events['testEvent'].length).toBe(4);
        EE.emit('testEvent', 'mockArg');
        expect(mockCallBack).toHaveBeenCalledTimes(2);
        expect(EE.events['testEvent'].length).toBe(3);
    })

    it('should emit named events with any number of arguments.', () => {
        const testArguments = jest.fn().mockImplementation((arg1, arg2, arg3, arg4, arg5) => { });
        EE.on('testEvent', testArguments);
        EE.emit('testEvent', 'arg1', 'arg2', 'arg3', 'arg4', 'arg5');
        expect(testArguments).toHaveBeenCalledWith('arg1', 'arg2', 'arg3', 'arg4', 'arg5');
    });

    it('should remove specific previously-registered event handlers', () => {
        let listeners;
        const mockCallBack3 = () => console.log('');
        listeners = EE.on('testEvent', mockCallBack3);
        expect(listeners.length).toBe(5);
        listeners = EE.clear('testEvent', mockCallBack3);
        expect(listeners.length).toBe(4);
    });

    it('should remove all previously-registered event handlers', () => {
        EE.clearAll('testEvent');
        expect(EE.events['testEvent']).toEqual([]);
    });
});
