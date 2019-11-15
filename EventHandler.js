const EventEmitter = require('events');

class EventHandler extends EventEmitter {

    log(message) {
        console.log(message);
        this.emit('EventName', {id: 1 , url: "http"})
    }
}