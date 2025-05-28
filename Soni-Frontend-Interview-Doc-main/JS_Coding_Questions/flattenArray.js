// Question
// Very frequently asked question
// Level -> Easy

// Write custom function for Array.flat() using both recursive and iterative
// approaches.

// const flattenRecursive = (arr) => {
// 	 //code here
// };

// const flattenIterative = (arr) => {
// 	// code here
// };



// Follow up
// // Write a function to flatten a nested array up to a given depth
// const flattenRecursiveWithDepth = (arr) => {
// 	// code here
// };




//Solution

// Recursive Approach without Depth
const flattenRecursive = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array");
    }
    const result = [];
    for (const ele of arr) {
        if (Array.isArray(ele)) {
            result.push(...flattenRecursive(ele)); 
        } else {
            result.push(ele);
        }
    }
    return result;
};

const resultRecursive = flattenRecursive(
[[[[0]], [1]], [[[2], [3]]], [[4], [5]]]
); // [0, 1, 2, 3, 4, 5]
console.log(resultRecursive, "Recursive Result");



// Iterative Approach without Depth
const flattenIterative = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array");
    }
    const stack = [...arr];
    const result = [];
    while (stack.length) {
        const ele = stack.pop();
        if (Array.isArray(ele)) {
            stack.push(...ele); 
        } else {
            result.push(ele); 
        }
    }
    return result.reverse();
};

// Test case for Iterative Approach
const resultIterative = flattenIterative([[[[0]], [1]], [[[2], [3]]], [[4], [5]]]); // [0, 1, 2, 3, 4, 5]
console.log(resultIterative, "Iterative Result");


//solution
// Recursive Approach with Depth
const flattenRecursiveWithDepth = (arr, depth) => {
    if (!Array.isArray(arr)) {
      throw new TypeError("The first argument must be an array.");
    }
  
    let result = [];
  
    if (depth === 0) return arr;
  
    for (let ele of arr) {
      if (Array.isArray(ele) && depth > 0) {
        result.push(...flattenRecursiveWithDepth(ele, depth - 1));
      } else {
        result.push(ele);
      }
    }
  
    return result;
  };
  
  const result = flattenRecursiveWithDepth(
              [[[[[0]]], [1]], [[[2], [3]]], [[4], [5]]], 1
  );
  console.log(result);