// Question
// Asked in Dream11
// Level ->> Medium

// Write a polyfill for clearAllTimeout that tracks and clears all timeouts set
// using setTimeout.

// // Test
// const timeout1 = setTimeout(() => console.log("Timeout 1"), 10000);
// const timeout2 = setTimeout(() => console.log("Timeout 2"), 3000);
// const timeout3 = setTimeout(() => console.log("Timeout 3"), 4000);

// setTimeout(() => {
//   console.log("Clearing all timeouts...");
//   clearAllTimeout();
// }, 5000); // This should clear all timeouts before they execute

// // Timeout 2
// // Timeout 3






//Solution
// we are storing original function in a varibale and overriding setTimeOut
// with custom functionality

//Using IIFE
(function () {
  let timeouts = [];

  // set original setTimeout in a variable
  const originalSetTimeout = this.setTimeout;

  // modify original setTimeOut
  this.setTimeout = function (callback, delay, ...args) {
    const timeoutId = originalSetTimeout(callback, delay, ...args);
    timeouts.push(timeoutId); // Store the timeout ID
    return timeoutId;
  };

  // Define clearAllTimeout to clear all timeouts
  this.clearAllTimeout = function () {
    timeouts.forEach((value, timeoutId) => {
      this.clearTimeout(timeoutId); // Clear each timeout
    });
    timeouts = [];
  };
})();
