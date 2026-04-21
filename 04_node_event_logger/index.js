import logEvent from './logEvents.js';
import EventEmitter from 'events';

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

// listen for the log event
myEmitter.on('log', (msg) => logEvent(msg));

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted');
}, 2000);