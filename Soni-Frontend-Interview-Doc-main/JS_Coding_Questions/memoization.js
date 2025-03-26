// Question
// Level ->> Medium
// Asked in Rippling, Forward network


// Write a memoization function ?

// // Intially start with number data type ->  then string  ->  Object  -> 
// // Sort object

// const memoization = (fn) => {
//     // write you code here
// }

// // Example Function
// const exampleFunction = (a, b) => {
//   console.log("Function executed");
//   return a + b;
// };

// // Memoized Function
// const memoizedExample = memoization(exampleFunction);

// console.log(memoizedExample(1, 2)); // Cache miss 
// console.log(memoizedExample(1, 2)); // Cache hit 

// console.log(memoizedExample("hello", "world")); // Cache miss
// console.log(memoizedExample("hello", "world")); // Cache hit


// // Follow up question
// const exampleObj = (obj1, num) => {
//   console.log("Function executed");
//   return obj1.a + obj1.b + obj1.c + num; 
// };

// const memoizedExampleObj = memoization(exampleObj);

// // Test Cases with Objects
// console.log(memoizedExampleObj({ a: 1, b: 2, c: 3 }, 6)); // Cache miss
// console.log(memoizedExampleObj({ c: 3, b: 2, a: 1 }, 6)); 
// // Cache hit (key order normalized)

// console.log(memoizedExampleObj({ a: 1, b: 2, c: 3 }, 10)); // Cache miss
// console.log(memoizedExampleObj({ a: 1, b: 2, c: 3 }, 10)); // Cache hit




// Solution
const memoization = (fn) => {
    const cache = new Map();
  
    // Serialize arguments to create a unique key
    const serialize = (value) => {
      if (typeof value === "object" && value !== null) {
        // Normalize the object by sorting its keys
        const sortedKeys = Object.keys(value).sort();
        return `{${sortedKeys.map((key) => `"${key}":${JSON.stringify(value[key])}`).join(",")}}`;
      }
      return JSON.stringify(value); // Handle numbers, strings, etc.
    };
  
    return function (...args) {
      const cacheKey = args.map(serialize).join("|");
  
      if (cache.has(cacheKey)) {
        console.log(`Cache hit for: ${cacheKey}`);
        return cache.get(cacheKey);
      }
  
      console.log(`Cache miss for: ${cacheKey}`);
      const result = fn.apply(this, args);
      cache.set(cacheKey, result);
      return result;
    };
  };

