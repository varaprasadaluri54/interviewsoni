// Question
// Asked in Coursera recently
// Level ->> Medium

// class Events {
//     constructor() {
//         this._subscriptions = new Map();
//     }

//     // Function to subscribe to an event
//     subscribe(name, callback) {
//         // Implement subscription logic
//     }

//     // Function to subscribe to an event once
//     subscribeOnce(name, callback) {
//         // Implement one-time subscription logic
//     }

//     // Function to subscribe to an event once asynchronously
//     async subscribeOnceAsync(name) {
//         // Implement async one-time subscription logic
//     }

//     // Function to publish an event
//     publish(name, data) {
//         // Implement event publishing logic
//     }

//     // Function to publish all events
//     publishAll(data) {
//         // Implement logic for publishing all events
//     }
// }

// //Test
// const events = new Events();

// // Subscription
// const newUserNewsSubscription = events.subscribe("new-user",
//  function (payload) {
//     console.log(`Sending Q1 News to: ${payload}`);
// });

// events.publish("new-user", "Jhon");
// console.log("--------");

// // Adding another subscription
// const newUserNewsSubscription2 = events.subscribe("new-user",
// function (payload) {
//     console.log(`Sending Q2 News to: ${payload}`);
// });

// events.publish("new-user", "Doe");
// console.log("--------");

// // Removing a subscription
// newUserNewsSubscription.remove();
// events.publish("new-user", "Foo");
// console.log("--------");

// // Publish all events
// events.publishAll("FooBar");
// console.log("--------");

// // Subscribe once
// events.subscribeOnce("new-user", function (payload) {
//     console.log(`I am invoked once ${payload}`);
// });

// events.publish("new-user", "Foo Once");
// console.log("--------");

// events.publish("new-user", "Foo Twice");
// console.log("--------");

// // Subscribe once asynchronously
// events.subscribeOnceAsync("new-user").then(function (payload) {
//     console.log(`I am invoked once asynchronously: ${payload}`);
// });

// events.publish("new-user", "Foo Once Async");
// console.log("--------");

// // Output
// Sending Q1 News to: Jhon
// --------
// Sending Q1 News to: Doe
// Sending Q2 News to: Doe
// --------
// Sending Q2 News to: Foo
// --------
// Sending Q2 News to: FooBar
// --------
// Sending Q2 News to: Foo Once
// I am invoked once Foo Once
// --------
// Sending Q2 News to: Foo Twice
// --------
// Sending Q2 News to: Foo Once Async
// --------
// I am invoked once asynchronously: Foo Once Async

//Solution

class Events {
  constructor() {
    this._subscriptions = new Map(); // Stores all event subscriptions.
    // 🚨 dont create differnt map to handle subscribeOnce & subscribeOnceAsync
  }

  subscribe(name, callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback should be a function");
    }

    if (!this._subscriptions.has(name)) {
      this._subscriptions.set(name, []);
    }

    const subscription = { callback };
    this._subscriptions.get(name).push(subscription);

    return {
      remove: () => {
        const eventSubscriptions = this._subscriptions.get(name);
        const index = eventSubscriptions.findIndex(
          (sub) => sub.callback === callback
        );
        if (index !== -1) {
          eventSubscriptions.splice(index, 1);
          // Remove the subscription
        }
      },
    };
  }

  subscribeOnce(name, callback) {
    const removeOnce = this.subscribe(name, (payload) => {
      callback(payload);
      removeOnce.remove(); // Remove the subscription after it runs
    });
  }

  async subscribeOnceAsync(name) {
    return new Promise((resolve) => {
      const removeOnce = this.subscribe(name, (payload) => {
        resolve(payload);
        removeOnce.remove(); // Remove the subscription after it runs
      });
    });
  }

  publish(name, data) {
    const eventSubscriptions = this._subscriptions.get(name);
    if (!eventSubscriptions) {
      return;
    }

    eventSubscriptions.forEach((sub) => sub.callback(data));
  }

  publishAll(data) {
    this._subscriptions.forEach((eventSubscriptions) => {
      eventSubscriptions.forEach((sub) => sub.callback(data));
    });
  }
}
