const EventImitter = require('events');

class MyCustomEmitter extends EventImitter {
  constructor() {
    super();
    this.greeting = 'Hello';
  }

  greet(name) {
    this.emit('greeting', `${this.greeting}, ${name}`);
  }
}

const myCustomerEmitter = new MyCustomEmitter();

myCustomerEmitter.on('greeting', (input) => {
  console.log(`Greeting event`, input);
});

myCustomerEmitter.greet('Chan');
