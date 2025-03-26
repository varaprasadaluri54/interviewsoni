// Question
// Asked in Thoughspot
// Level ->>> Hard

// // How can you implement a Promise.cancelable utility to allow 
// // cancellation of a promise with a custom error?

// Promise.cancelable = (promise) => {
// 	//code here
// }

// // Test
// const asyncTask1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("Task 1 completed");
//   }, 500);
// });
// const asyncTask2 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("Task 2 completed");
//   }, 3000);
// });

// const cancelableTask1 = Promise.cancelable(asyncTask1);
// const cancelableTask2 = Promise.cancelable(asyncTask2);

// cancelableTask1
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
  
//   cancelableTask2
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// // Cancel the task after 1 second
// setTimeout(() => {
//   cancelableTask1.cancel();
//   cancelableTask2.cancel()
// }, 1000);

// // Output
// // Task 1 completed
// // ERROR! CanceledPromiseError: Promise has been canceled




// Solution
// we are building wrapper on existing promise and function cancel

class CanceledPromiseError extends Error {
    constructor() {
      super("Promise has been canceled");
      this.name = "CanceledPromiseError";
    }
  }
  
  Promise.cancelable = (promise) => {
    let isCanceled = false;
  
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        (value) => {
          if (isCanceled) {
            reject(new CanceledPromiseError());
          } else {
            resolve(value);
          }
        },
        (error) => {
          reject(error); // Propagate any errors from the original promise
        }
      );
    });
  
    wrappedPromise.cancel = () => {
      isCanceled = true;
    };
  
    return wrappedPromise;
  };

