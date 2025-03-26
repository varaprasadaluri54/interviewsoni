// Question
// Asked in servicenow and AngleOne
// Level -> Easy

// Explain how prototypal inheritance works in JavaScript
// and how a child inherits properties from a parent using prototype. 



//Solution

// This can be easily done using a class-based but to judge your prototype knowledge
// such questions can come.

//parent function
function Person(name) { 
    this.name = name;
  }
  Person.prototype.hello = function() {
    return `Hello ${this.name}`;
  };
  
  //child function
  function Developer(name, title) {
    Person.call(this, name);
    this.title = title;
  }
  
  // Override person prototype in Developer's prototype
  Developer.prototype = Object.create(Person.prototype); 
  
   // Reset the constructor property of Developer's prototype
  Developer.prototype.constructor = Developer;
  
  // Now you can add any methods in developer prototype 
  Developer.prototype.getTitle = function() {
    return this.title;
  };
  
  
  const obj = new Developer("Alice", "Software Engineer");
  console.log(obj.hello()); // Output: Hello Alice
  console.log(obj.getTitle()); // Output: Software Engineer
  
  // Learn more here about - https://www.youtube.com/watch?v=CpmE5twq1h0
  // https://youtu.be/wstwjQ1yqWQ?si=gXOhIy4v_9NELs-j