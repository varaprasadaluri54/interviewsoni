// Question
// Level ->> Medium
// Asked in PharmEasy

// Attach event on push element in an array ?




//Solution
const originalPush = Array.prototype.push;

// Modify the push method
Array.prototype.push = function (...args) {
  const result = originalPush.apply(this, args);
  if (this.onPush) {
    this.onPush(args);
  }
  return result;
};

Array.prototype.setPushCb = function (callback) {
  if (typeof callback === 'function') {
    this.onPush = callback;  // Store the callback function on the array
  } else {
    throw new TypeError('Callback must be a function');
  }
};

// Test
const arr = [];
arr.setPushCb((items) => {
  console.log('Items pushed:', items);
});

arr.push(1); 
arr.push(2, 3);