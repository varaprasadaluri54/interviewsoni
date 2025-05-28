// Asked in Atlassian

// Write a utility measureFunctionPerformance that measures the average execution time
// of a given sync or async function over multiple iterations. callback function be called with average time taken.

// Questions
//  function measureFunctionPerformance(fn, iterations = 1000, label = 'Function', callback = null) {
    // write your code here
// }

// function sum() {
//   let total = 0;
//   for (let i = 0; i < 1000; i++) total += i;
// }

// async function wait50ms() {
//   return new Promise(res => setTimeout(res, 50));
// }

// function logResult(result) {
//   console.log(`🔍 Result:`, result);
// }

// Sync
// measureFunctionPerformance(sum, 50, 'Sum function', logResult);

// Async
// measureFunctionPerformance(wait50ms, 5, 'Wait 50ms', logResult);


// Solution
async function measureFunctionPerformance(fn, iterations = 100, label = 'Function', callback = null) {
  const isAsync = fn.constructor.name === 'AsyncFunction';
  let total = 0;

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();

    if (isAsync) {
      await fn();
    } else {
      fn();
    }

    const end = performance.now();
    total += (end - start);
  }

  const avg = total / iterations;
  const result = {
    label,
    isAsync,
    iterations,
    averageTime: avg,
  };

  if (typeof callback === 'function') {
    callback(result);
  }

  return result;
}

function sum() {
  let total = 0;
  for (let i = 0; i < 1000; i++) total += i;
}

async function wait50ms() {
  return new Promise(res => setTimeout(res, 50));
}

function logResult(result) {
  console.log(`🔍 Result:`, result);
}

// Sync
measureFunctionPerformance(sum, 50, 'Sum function', logResult);

// Async
measureFunctionPerformance(wait50ms, 50, 'Wait 50ms', logResult);


