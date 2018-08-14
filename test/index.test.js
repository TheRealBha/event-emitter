'use strict';

const EventEmitter = require('..');

const EE = new EventEmitter();

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

    it('should register "one-time" handler that will be called at most one time.', () => {

        EE.on('testEvent', mockCallBack2)
        EE.once('testEvent', mockCallBack);
        expect(EE.events['testEvent'].length).toBe(4);
        EE.emit('testEvent', 'mockArg');
        expect(mockCallBack).toHaveBeenCalledTimes(2);
        expect(EE.events['testEvent'].length).toBe(3);
    })

    it('should emit named events with any number of arguments.', () => {
        const testArguments = jest.fn().mockImplementation((arg1, arg2, arg3, arg4, arg5) => {}); 
        EE.on('testEvent', testArguments);
        EE.emit('testEvent', 'arg1', 'arg2', 'arg3', 'arg4', 'arg5');
        expect(testArguments).toHaveBeenCalledWith('arg1', 'arg2', 'arg3', 'arg4', 'arg5');
    });

    it('should remove specific previously-registered event handlers', () => {
        const mockCallBack3 = () => console.log('');
        EE.on('testEvent', mockCallBack3)
        expect(EE.events['testEvent'].length).toBe(5);
        EE.clear('testEvent', mockCallBack3);
        expect(EE.events['testEvent'].length).toBe(4);

    });

    it('should remove all previously-registered event handlers', () => {
        EE.clearAll('testEvent');
        expect(EE.events['testEvent']).toBe(undefined);
    });
});
