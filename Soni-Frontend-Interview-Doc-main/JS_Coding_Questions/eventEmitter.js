// Question
// Asked in BookmyShow and Dp world
// Level -> Easy

// How does the EventEmitter class handle multiple event subscriptions and
// allow unsubscribing from individual events?

// class EventEmitter {
//     constructor() {}

//     // Subscribe to an event
//     subscribe(eventName, callback) {}

//     // Emit an event
//     emit(eventName, ...args) {}
// }

// // Example usage:
// const emitter = new EventEmitter();

// const subscription = emitter.subscribe("modify", (link) => {
//     console.log(`Modified: ${link}`);
// });

// emitter.emit("modify", "test@gmail.com");
// subscription.remove();

// No event will get published as it is removed
// emitter.emit("modify", "test@gmail.com");

// No event found
// emitter.emit("noEventfount", "test@gmail.com");





//Solution
class EventEmitter {
  constructor() {
    this._eventSubscriptions = new Map();
  }

  // Subscribe to an event
  subscribe(eventName, callback) {
    // type check
    if (typeof callback !== "function") {
      throw new TypeError("Callback should be a function");
    }

    // if event already exist
    if (!this._eventSubscriptions.has(eventName)) {
      this._eventSubscriptions.set(eventName, new Map());
    }

    //for unique idetifier, you can use Date.now() also
    const subscriptionId = Symbol();

    const subscriptions = this._eventSubscriptions.get(eventName);
    subscriptions.set(subscriptionId, callback);

    return {
      remove: () => {
        if (!subscriptions.has(subscriptionId)) {
          throw new Error("Subscription has already removed");
        }
        subscriptions.delete(subscriptionId);
      },
    };
  }

  // Emit an event
  emit(eventName, ...args) {
    const subscriptions = this._eventSubscriptions.get(eventName);
    if (!subscriptions) {
      throw new Error("No event found");
    }

    subscriptions.forEach((callback) => callback(...args));
  }
}
