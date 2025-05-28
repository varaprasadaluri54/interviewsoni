// Question
// Level -> Easy
// ** Very frequently asked question **
// // Reduce is important among all

// Write custom polyfill for map, reduce, filter, every ?

// Solutions

//Map
Array.prototype.myMap = function(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
  };
  
  //Filter
  Array.prototype.myFilter = function(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
    return result;
  };
  
  //Reduce
  Array.prototype.myReduce = function(callback, initialValue) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    const startIndex = initialValue !== undefined ? 0 : 1;
  
    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  };
  
  //Every
  Array.prototype.myEvery = function(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    for (let i = 0; i < this.length; i++) {
      if (!callback(this[i], i, this)) {
        return false;
      }
    }
    return true;
  };
  
  const arr = [1, 2, 3, 4, 5];
  
  // Using myMap
  const doubled = arr.myMap(x => x * 2);
  console.log(doubled); // [2, 4, 6, 8, 10]
  
  // Using myFilter
  const evenNumbers = arr.myFilter(x => x % 2 === 0);
  console.log(evenNumbers); // [2, 4]
  
  // Using myReduce
  const sum = arr.myReduce((acc, curr) => acc + curr, 0);
  console.log(sum); // 15
  
  // Using myEvery
  const allPositive = arr.myEvery(x => x > 0);
  console.log(allPositive); // true
  