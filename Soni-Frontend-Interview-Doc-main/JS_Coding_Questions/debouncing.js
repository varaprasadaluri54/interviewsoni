// Question
// Level ->>> Hard
// Asked in mindtickle

// // Follow up question with leading and traling spaces

// function debounce(func, wait, option = {leading: false, trailing: true}) {
// 	//code here
// }

// // Test Case 1: {leading: false, trailing: true} (default case)
// const logMessage1 = debounce((message) => {
//   console.log(message);
// }, 1000, { leading: false, trailing: true });

// logMessage1("A");
// logMessage1("B");
// logMessage1("C");
// setTimeout(() => logMessage1("D"), 2000);
// setTimeout(() => logMessage1("E"), 2500);
// setTimeout(() => logMessage1("F"), 3000);
// setTimeout(() => logMessage1("G"), 3500);

// // Expected Output: "C", "G"



// // Test Case 2: {leading: true, trailing: true}
// const logMessage2 = debounce((message) => {
//   console.log(message);
// }, 1000, { leading: true, trailing: true });

// logMessage2("A"); 
// logMessage2("B");
// logMessage2("C");
// setTimeout(() => logMessage2("D"), 2000);
// setTimeout(() => logMessage2("E"), 2500);
// setTimeout(() => logMessage2("F"), 3000);
// setTimeout(() => logMessage2("G"), 3500);

// // Expected Output: "A", "C", "D", "G"



// // Test Case 3: {leading: true, trailing: false}
// const logMessage3 = debounce((message) => {
//   console.log(message);
// }, 1000, { leading: true, trailing: false });

// logMessage3("A"); 
// logMessage3("B");
// logMessage3("C");
// setTimeout(() => logMessage3("D"), 2000);
// setTimeout(() => logMessage3("E"), 2500);
// setTimeout(() => logMessage3("F"), 3000);
// setTimeout(() => logMessage3("G"), 3500);

// // Expected Output: "A" "D"




//Solution
function debounce(func, wait, option = {leading: false, trailing: true}) {
    let timerId = null;
    let lastArgs = null;
    // if both leading and trailing are false then do nothing.
    if(!option.leading && !option.trailing) return () => null;
    
    return function debounced(...args) {
      // if timer is null and leading is true
      if(!timerId && option.leading) {
        func.apply(this, args);
      } else {
        lastArgs = args;
      }
      // clear timer so that next call is exactly after `wait` time
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        // invoke if traling and  lastArgs is present 
        if(option.trailing && lastArgs) func.apply(this, lastArgs); 
        
        // Resent varibale
        lastArgs = null;
        timerId = null;
      }, wait);
    }
  }