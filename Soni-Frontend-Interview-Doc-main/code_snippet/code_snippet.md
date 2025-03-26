## Question 1

```javascript
function Example() {
    let y;
    console.log(x, y)
    if (true) {
        var x = 10; 
        let y = 10; 
        console.log(x,y)
    }
    console.log(x,y)
}
Example();
```

<details>
  <summary>Answer</summary>

undefined unundefined

10,10

10, undefined


var x is function-scoped and hoisted, so x is undefined initially, even before its declaration.
let y is block-scoped, so the outer y is separate from the inner y. Outside the block, y remains uninitialized.

</details>


## Question 2

```javascript
const obj = {
    value: 42,
    showArrow: function () {
        setTimeout(() => {
            console.log(this.value);
        }, 1000);
    },
    showNormal: function () {
        setTimeout(function () {
            console.log(this.value);
        }, 1000);
    },
};

obj.showArrow(); 
obj.showNormal(); 
```



<details>
  <summary>Answer</summary>

 
42 undefined

In arrFn, the arrow function preserves this from obj. In normalFn, this inside the setTimeout refers to window.

</details>



## Question 3

```javascript
var p = 1;
function outerFn() {
    var p = 2;
    function innterFn() {
        p++;
        console.log(p);
        var p = 3
        console.log(p)
    }
    innterFn()
    console.log(p)
}
outerFn()
```



<details>
  <summary>Answer</summary>

NaN
3
2

p to be hoisted and initialized as undefined before incrementing so p++ results in NaN. 
then p = 3 as var is functional scope
for outer function p=2
</details>



## Question 4

```javascript
// frequently asked
const arr = [1, 2, 3, 4, 5];

for (var i = 0; i < arr.length; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

<details>
  <summary>Answer</summary>

5 5 5 5 5

var is functional scope so it is shared across all iteration, therefore use let to get output 0,1,2,3,4 as it is block scope

</details>


## Question 5

```javascript
// frequently asked
const arr = [1, 2, 3, 4, 5];
for (var i = 0; i < arr.length; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i); // Pass `i` as an argument to the IIFE
}
```



<details>
  <summary>Answer</summary>

0,1,2,3,4 -> for each IIFE it will create a new context and preserve value of i in its scope

</details>


## Question 6

```javascript
//Asked in Amazon
var a = 10;
x()
y()
z() 

function x(){
 var a = 20;
 console.log(this.a)
}
function y(){
  console.log(this.a)
}
const z = () => {
  console.log(this.a)
}
```



<details>
  <summary>Answer</summary>

10 10 , ReferenceError

x(), y() -> this share global scope
z() -> tried to access before initilization

</details>


## Question 7

```javascript
// this is follow up question for above question
let a = 10;
x()
y()
z() 

function x(){
 console.log(this.a)
}
function y(){
  console.log(this.a)
}
const z = () => {
  console.log(this.a)
}
```



<details>
  <summary>Answer</summary>

undefined, undefined , ReferenceError

In regular functions (x() and y()), this refers to the global object, which does not have variable a so it return undefined.


</details>

## Question 8

```javascript
function func() {
    try {
        console.log(1)
        return
    } catch (e) {
        console.log(2)
    } finally {
        console.log(3)
    }
    console.log(4)
}
func()
```
<details>
  <summary>Answer</summary>

1,3

"finally" block runs even after "return" statement, so console.log(3) is executed

</details>

## Question 9

```javascript
let obj = { name: 'John' };
let weakMap = new WeakMap();
weakMap.set(obj, 'Person');

console.log(weakMap.has(obj));  

obj = null; 

setTimeout(() => {
  console.log(weakMap.has(obj)); 
}, 1000);
```



<details>
  <summary>Answer</summary>

true
false

obj = null ->  dereferences the object and grabage collection(GB) remove that object when i

</details>

## Question 10

```javascript
const myObject = {
  name: "Test",
  getFunctionName: function () {
    console.log(this.name);
  },
  getArrowFunctionName: () => {
    console.log(this.name);
  },
  updateArrowFunctionScope: function () {
    const innerArrowFunction = () => {
      console.log(this.name);
    };
    innerArrowFunction();
  },
};

myObject.getFunctionName();
myObject.getArrowFunctionName();
myObject.updateArrowFunctionScope();
```



<details>
  <summary>Answer</summary>

Inner-Test
Outer-test
Inner-Test


myObject.getFunctionName(): this in a regular function refers myObject
myObject.getArrowFunctionName(): Arraow function inherit this from outside scope
myObject.updateArrowFunctionScope():  Arraow function inherit this from outside and outside it is wrpeerd under function where this is "myObject"
</details>

## Question 11

```javascript
// asked similar question in mindtickle
function outer() {
    console.log(a);
    var a = 10;
    function inner() {
        console.log(a);
        return 10;
        function a () {
            var a = 10
        }
    }
    inner();
}
outer();
```



<details>
  <summary>Answer</summary>

undefined,
[Function: a]

var a declaration is hoisted so it is undefined for first console

"function a" declaration is hoisted, don't get confused by return statement

</details>

## Question 12

```javascript
//asked in dream 11

var doc = "Soni's frontend doc";
const obj = {
    doc:'soni',
    printName: function(){
        return this.doc
    },
    printNameArrow: () => {
        return this.doc
    },
    IIFE: (function(){
        // console.log(this)
        return this.doc
    })(),
    IIFEArrow: (() => {
        // console.log(this)
        return this.doc
    })()
}
console.log(obj.printName()) 
console.log(obj.printNameArrow()) 
console.log(obj.IIFE) 
console.log(obj.IIFEArrow)
```



<details>
  <summary>Answer</summary>

soni,  Soni's frontend doc, Soni's frontend doc, Soni's frontend doc,

normal function -> this refer to obj 
Arrow function -> this refer to outer scope: which is window obj
obj.IIFE -> this refers to the global
obj.IIFEArrow ->  this refers to the global

</details>

## Question 13

```javascript
function add5(x) {
  return x + 5;
}

function multiplyBy3(x) {
  return x * 3;
}

function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const addThenMultiply = compose(multiplyBy3, add5);
console.log(addThenMultiply(2));
```



<details>
  <summary>Answer</summary>

21,

self explanatory

</details>

## Question 14

```javascript
console.log(typeof null);
console.log(typeof undefined);
console.log(null === undefined);
console.log(null == undefined);
console.log(2 * '2');
console.log(2 * 'Hello');

```



<details>
  <summary>Answer</summary>

object,

undefined,

false,

true,

4,

NaN

</details>

## Question 15

```javascript
console.log([1,2,3] + [3,2,1])
```



<details>
  <summary>Answer</summary>
1,2,33,2,1

When the + operator is used with arrays, they are coerced to strings

</details>

## Question 16

```javascript
class Counter {
  #number = 10

  increment() {
    this.#number++
  }

  getNum() {
    return this.#number
  }
}

const counter = new Counter()
counter.increment()

console.log(counter.#number)
```



<details>
  <summary>Answer</summary>

Error

In ES2020, we can add private variables in classes by using the #. We cannot access these variables outside of the class. When we try to log counter.#number, a SyntaxError gets thrown: we cannot access it outside the Counter class!

</details>

## Question 17

```javascript
var name = "test"

function callName() {
    name= 'test2',
    console.log(name)
}
callName()
console.log(name)
```



<details>
  <summary>Answer</summary>

test2,
test2

self explanatory

</details>

## Question 18

```javascript
console.log([] == [])
console.log({} == {})
console.log(2 == "2")
console.log({} === {})
```



<details>
  <summary>Answer</summary>

false,
false,
true,
false

</details>

## Question 19

```javascript
const arr = [10, -1, 2];
arr.sort();
```



<details>
  <summary>Answer</summary>

[ -1, 10, 2 ],
sorts the array elements as considering element strings by default.

</details>

## Question 20

```javascript
//asked in Publicis Sapient
console.log(7 > 6 > 5);

```



<details>
  <summary>Answer</summary>

(7 > 6) > 5 -> true > 5 (1 > 5) -> false

</details>

## Question 21

```javascript
let a = 0;
a = ++a + a++ + --a + a--;
console.log(a);
```



<details>
  <summary>Answer</summary>
4

a = 0; a = 1 + 1 + 1 + 1; 
</details>

## Question 22

```javascript
What will happen when we will clik on button ?

<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
```



<details>
  <summary>Answer</summary>

button,
second div,
first div,

This happens due to event bubbling, where the click event propagates from the innermost element (button) to the outermost parent div

</details>

## Question 23

```javascript
async function foo() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}

foo();
console.log(3);

```
<details>
  <summary>Answer</summary>

1,
3,
2

await pauses the function execution, allowing the synchronous code 
to executed first

</details>


## Question 24

```javascript
Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.reject("Error")])
  .then((values) => console.log("Resolved:", values))
  .catch((err) => console.log("Caught:", err));

```

<details>
  <summary>Answer</summary>

Caught: Error

Promise.all rejects immediately if any promise in the array is rejected.

</details>





## Question 25

```javascript
Promise.all([Promise.resolve(1), undefined, null])
  .then((values) => console.log("Resolved:", values))
  .catch((err) => console.log("Caught:", err));

```
<details>
  <summary>Answer</summary>

Resolved: [1, null, ,undefined]


Promise.all treats undefined and null as resolved values

</details>


## Question 26

```javascript
//asked in multiplier

console.log("Start")
new Promise((resolve, rej) => {
    console.log("Promise1")
    resolve("resolved")
    console.log("Promise2")
}).then(data => console.log(data))
console.log("end")

```
<details>
  <summary>Answer</summary>

Start, 
Promise1, 
Promise2, 
end, 
resolved

the promise executor runs synchronously and rest run in asyn fashion

</details>

## Question 27

```javascript
console.log('Start');
setTimeout(() => {
  console.log('Timeout');
}, 0);
Promise.resolve().then(() => {
  console.log('Promise');
});
console.log('End');

```

<details>
  <summary>Answer</summary>

Start, 
End, 
Promise, 
Timeout

synchronous code runs first, then the microtask (Promise.then) executes, followed by the macrotask (setTimeout) after the event loop processes all microtasks

</details>


## Question 28

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
  Promise.resolve().then(() => {
    console.log('Promise 1');
  });
  setTimeout(() => {
    console.log('Timeout 2');
  }, 0);
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 2');
});

console.log('End');

```

<details>
  <summary>Answer</summary>

Start, 
End, 
Promise 2, 
Timeout 1, 
Promise 1, 
Timeout 2, 

synchronous code runs first, then the microtask Promise 2 executes, followed by the first macrotask Timeout 1 and its microtask Promise 1, and finally the second macrotask Timeout 2

</details>

## Question 29

```javascript
Promise.resolve(1)
    .then((x) => x + 1)
    .then((x) => {
        throw new Error("An error occurred!");
    })
    .catch((err) => {
        console.log(err.message);
        return 5;
    })
    .then((x) => console.log(x));

```



<details>
  <summary>Answer</summary>

An error occurred!, 
5

The "catch" block handles the error and returns 5. This value is passed to the next then.

</details>

## Question 30

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("First");
    resolve("Second");
    reject("Third");
});

promise
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

```



<details>
  <summary>Answer</summary>

First


A promise can only resolve/reject once. The subsequent resolve and reject calls are ignored.

</details>

## Question 31

```javascript
console.log('Start');

async function foo() {
  console.log('Foo Start');
  await new Promise(resolve => setTimeout(resolve, 0));
  console.log('Foo End');
}

foo().then(() => {
  console.log('After Foo');
});

console.log('End');
```



<details>
  <summary>Answer</summary>

Start, 
Foo Start, 
End, 
Foo End, 
After Foo

</details>

## Question 32

```javascript
Promise.reject("Error")
  .catch((err) => {
    console.log("Caught:", err);
    return "Recovered";
  })
  .finally(() => {
    console.log("Finally 2");
  })
  .then((value) => {
    console.log("Then:", value);
  });
```



<details>
  <summary>Answer</summary>

Caught: Error, 
Finally 2, 
Then: Recovered

The catch handles the rejection and passes "Recovered" to the next then. The finally block executes but does not alter the flow.


</details>

## Question 33

```javascript
let c = { greeting: 'Hey!' };
let d;

d = c;
c.greeting = 'Hello';

console.log(d.greeting);


```



<details>
  <summary>Answer</summary>

"Hello"

both c and d are pointing towards same reference.
</details>

## Question 34

```javascript
const obj = { value: 10 };

function calculate(add, multiply) {
  return (this.value + add) * multiply;
}

const newObj = { value: 20 };

console.log(calculate.call(obj, 5, 2)); 
console.log(calculate.apply(newObj, [3, 4]));

const boundCalc = calculate.bind(obj, 2);
console.log(boundCalc(3));

```



<details>
  <summary>Answer</summary>

30, 
92,
36

call and apply invoke the function immediately with a specified this and arguments. bind create new function with this which can be called later at any point.

</details>

## Question 35

```javascript
const obj = {
  name: "John",
  getName: function () {
    return this.name;
  },
};

const bound1 = obj.getName.bind({ name: "Frank" });
const bound2 = bound1.bind({ name: "Grace" });

console.log(bound1());
console.log(bound2());

```



<details>
  <summary>Answer</summary>

Frank, 
Frank

bind creates a new function with a permanently bound this. Since bound1 already has this bound to { name: "Frank"}, further binding (with bound2) has no effect
</details>

## Question 36

```javascript
const obj = Object.freeze({
  a: 1,
  b: { c: 2 },
});

obj.b.c = 3; 
obj.d = 4;

console.log(obj);

```



<details>
  <summary>Answer</summary>

{
  a: 1,
  b: { c: 3 }
}


Object.freeze() makes an object shallowly immutable. This means properties cannot be added or deleted from the object. However, nested objects are not deeply frozen, so obj.b.c can be modified, but obj.d cannot be added.

</details>

## Question 37

```javascript
const userDetails = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
  address: { city: "Bangalore", country: "USA" }
}

let cloneUserDetails = { ...userDetails };

//Updating original object
userDetails.age = 18;
userDetails.address.city = "chennai";

console.log(cloneUserDetails.age); 
console.log(cloneUserDetails.address.city);


```



<details>
  <summary>Answer</summary>

25, 
chennai


cloneUserDetails.age remains 25 because it's a shallow copy.

</details>

## Question 38

```javascript
const obj = {
  _value: 1,
  get value() {
    return this._value * 2;
  },
  set value(val) {
    this._value = val + 1;
  },
};

obj.value = 5;
console.log(obj.value);

```



<details>
  <summary>Answer</summary>
12


Setting obj.value triggers the setter -> 5 + 1 = 6. 
The getter then returns 6 * 2 = 12

</details>

## Question 39

```javascript
function Animal() {
  this.species = "Animal";
}

Animal.prototype.getSpecies = function() {
  return this.species;
};

function Dog() {
  this.species = "Dog";
}

Dog.prototype = new Animal();

const dog = new Dog();
console.log(dog.getSpecies());

```



<details>
  <summary>Answer</summary>

"Dog"


this.species in the getSpecies method refers to the dog instance, which has its own species property set to "Dog"

</details>

## Question 40

```javascript
function A() {}
function B() {}

A.prototype = new B();

const a = new A();
console.log(a instanceof A);
console.log(a instanceof B);

```



<details>
  <summary>Answer</summary>

true, 
true

a instanceof A returns true ->  a inherits from A.prototype
a instanceof B -> because A.prototype is an instance of B
</details>

## Question 41

```javascript
function Person(name) {
    this.name = name;
    return { name: "John" };
}

const person = new Person("Alice");
console.log(person.name);
```



<details>
  <summary>Answer</summary>

John

When a constructor explicitly returns an object, the returned object overrides this.
</details>

## Question 42

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  return "Hello, " + this.name;
};

function Employee(name, job) {
  Person.call(this, name); // Call the Person constructor
  this.job = job;
}

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.sayHello = function() {
  return "Hello, I am " + this.name + " and I work as a " + this.job;
};

const employee = new Employee("Alice", "Developer");
console.log(employee.sayHello());

```



<details>
  <summary>Answer</summary>

Hello, I am Alice and I work as a Developer


If you will remove sayHelloo method from Employee then it will look into its
prototype chain and call Person sayHello method.

</details>

## Question 43

```javascript
console.log("10" - "4" + "2");
```



<details>
  <summary>Answer</summary>

"62"

"10" - "4" is 6 (numbers), and then
6 + "2" results is "62"
"10" - "4" + "2" → "62" 
</details>


## Question 44

```javascript
const { a: x = 10, b: y = 20 } = { a: undefined, b: null };

console.log(x);
console.log(y);
```



<details>
  <summary>Answer</summary>

10  -> Default value is used because `a` is explicitly `undefined`
null -> Default value is ignored because `b` is explicitly `null`.

</details>

## Question 45

```javascript
// asked in mindtree
console.log(NaN == NaN); 
```



<details>
  <summary>Answer</summary>
  false

  NaN is not equal to itself.


</details>

## Question 46

```javascript
const obj = {
  a: 1
};

console.log(obj.hasOwnProperty('a'));
console.log(obj.hasOwnProperty('b'));
```



<details>
  <summary>Answer</summary>

true,
false

a is a direct property of obj
b is not a direct property of obj
</details>

## Question 47

```javascript
const obj1 = {
  hasOwnProperty: function() {
    return 'return!';
  },
  a: 1
};

console.log(obj1.hasOwnProperty('a'));
```



<details>
  <summary>Answer</summary>

  return

the hasOwnProperty method is overridden in obj1, so it doesn't call the original Object.prototype.hasOwnProperty method
</details>

## Question 48

```javascript
const obj1 = { a: 1 };
const obj2 = Object.create(obj1);

console.log(obj2.__proto__ === obj1);
```



<details>
  <summary>Answer</summary>

true 

__proto__ points to the prototype of an object. Since obj2 was created with obj1 as its prototype, obj2.__proto__ points to obj1
</details>

## Question 49

```javascript
const obj = { a: 1, b: 2 };
delete obj.a;
console.log(obj.a); 
console.log('a' in obj);
```



<details>
  <summary>Answer</summary>

undefined, 
false

</details>

## Question 50

```javascript
console.log(a);
console.log(b);
console.log(c);

var a = 10;
let b = 20;
const c = 30;
```



<details>
  <summary>Answer</summary>

undefined

ReferenceError: Cannot access 'b' before initialization

ReferenceError: Cannot access 'c' before initialization
</details>


