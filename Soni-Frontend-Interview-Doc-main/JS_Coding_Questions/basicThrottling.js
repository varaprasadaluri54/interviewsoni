// Question
// Level -> Easy
// Asked in sumo logic, hotstar

// Implement basic throttling funtion in js?

// const throttleFnTimeBased = (fn, delay) => {
// 	//code here
// }
// //Test
// const throttledFunction = throttleFnTimeBased((msg) => {
//   console.log(msg, Date.now());
// }, 2000);

// throttledFunction("Call 1");  // Executes immediately
// throttledFunction("Call 2");  // Throttled
// throttledFunction("Call 3");  // Throttled

// setTimeout(() => throttledFunction("Call 4"), 1100);
// // Executes after 1.1 seconds
// setTimeout(() => throttledFunction("Call 5"), 900);
// // throttle
// setTimeout(() => throttledFunction("Call 6"), 2100);
// // Executes after 2.1 seconds

//Solution
const throttleFnTimeBased = (fn, delay) => {
  let lastExecuted = null;
  let timerId = null;
  return function (...args) {
    if (!lastExecuted) {
      fn.apply(this, args);
      lastExecuted = Date.now();
    } else {
      // remove previous timer
      clearTimeout(timerId);

      // create new timer remaning time
      timerId = setTimeout(() => {
        if (Date.now() - lastExecuted >= delay) {
          fn.apply(this, args);
          lastExecuted = Date.now();
        }
      }, delay - (Date.now() - lastExecuted));
    }
  };
};
const throttledFunction = throttleFnTimeBased((msg) => {
  console.log(msg, Date.now());
}, 2000);

throttledFunction("Call 1"); // Executes immediately
throttledFunction("Call 2"); // Throttled
throttledFunction("Call 3"); // Throttled

setTimeout(() => throttledFunction("Call 4"), 1100);
// Executes after 1.1 seconds
setTimeout(() => throttledFunction("Call 5"), 900);
// throttle
setTimeout(() => throttledFunction("Call 6"), 2100);
