const EventImitter = require('events');
const emitter = new EventImitter();

// register a listener
emitter.on('greet', (name) => {
  console.log(`Hello ${name}`);
});

emitter.emit('greet', 'Chan');
