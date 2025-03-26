// Question
// Asked in Jio and Expedia
// Level -> Easy

// Write custome polyfill for call, apply and bind method ?




//Solution

//Polyfill for Call
Function.prototype.myCall = function (context, ...args) {
    // Ensure arguments are correct
    if (typeof this !== "function") {
      throw new TypeError("myCall must be called on a function");
    }
  
    context = context !== null && context !== undefined ? Object(context) : globalThis;
  
    const uniqueSymbol = Symbol(); // it shoud be unique
    context[uniqueSymbol] = this;
  
    // Call the function with the provided arguments
    const result = context[uniqueSymbol](...args);
  
    // Remove the unique property to avoid side effects
    delete context[uniqueSymbol];
  
    return result;
  };
  
  // Testing myCall
  function greet(name) {
    return `Hello, ${name}`;
  }
  
  const person = { name: "John" };
  console.log(greet.myCall(person, "Alice"));  



  //Polyfill for Apply
Function.prototype.myApply = function (context, args) {
    if (typeof this !== "function") {
      throw new TypeError("myApply must be called on a function");
    }
  
    // Ensure context is an object
    context = context !== null && context !== undefined ? Object(context) : globalThis;
  
    // Ensure args is an array
    if (!Array.isArray(args)) {
      throw new TypeError("The second argument must be an array");
    }
  
    const uniqueSymbol = Symbol();
    context[uniqueSymbol] = this;
  
    // Call the function with arguments spread out (if any)
    const result = context[uniqueSymbol](...args);
  
    delete context[uniqueSymbol];
  
    return result;
  };
  
  function sum(a, b) {
    return a + b;
  }
  
  const context = {};
  console.log(sum.myApply(context, [5, 10])); 



  //Polyfill for Bind
Function.prototype.myBind = function (context, ...boundArgs) {
    if (typeof this !== "function") {
      throw new TypeError("myBind must be called on a function");
    }
  
    // Ensure context is an object
    context = context !== null && context !== undefined ? Object(context) : globalThis;
  
    const fn = this;
  
    return function (...args) {
      return fn.apply(context, [...boundArgs, ...args]);
    };
  };
  
  function multiply(a, b) {
    return a * b;
  }
  
  const boundMultiply = multiply.myBind(null, 2);
  console.log(boundMultiply(3));  
  console.log(boundMultiply(4));