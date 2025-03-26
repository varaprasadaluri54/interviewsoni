// Question
// Asked in Thoughtspot, Multiplier
// Level ->> Medium

// Write custom function for JSON.stringify

// const obj = {
//   name: "John",
//   age: 30,
//   city: "New York",
//   addr: ["chandpol", "avv"],
//   myUndefined: undefined,
//   myNull: null,
//   circularRef: null,
//   nested: {
//     name: "Nested",
//     valid: true,
//   },
//   fn: () => {}
// };

// function myStringify( your args) {
// 	//code here
// }

// //output

// {
// 	"name":"John",
// 	"age":30,
// 	"city":"New York",
// 	"addr":["chandpol","avv"],
// 	"myNull":null,
// 	"circularRef":null,
// 	"nested":{"name":"Nested","valid":true}
// }

// Solution

//  In interview don't handle all data type in one shot, you can start with
//  string number object array then go for handling circular depedency

//  handle null properly, beacause typeof null === object

function myStringify(value, seen = new WeakSet()) {
  if (value === null || value === undefined || typeof value === "symbol") {
    return "null";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return `${value}`;
  }

  if (typeof value === "function") {
    return undefined;
  }

  if (Array.isArray(value)) {
    let arrayResult = value
      .map((item) =>
        myStringify(item, seen) === undefined ? "null" : myStringify(item, seen)
      )
      .join(",");
    return `[${arrayResult}]`;
  }

  if (typeof value === "object") {
    if (seen.has(value)) {
      throw new Error("Circular reference detected");
    }
    seen.add(value);

    let objResult = Object.entries(value)
      .filter(([key, val]) => typeof val !== "function" && val !== undefined)
      .map(([key, val]) => `"${key}":${myStringify(val, seen)}`)
      .join(",");

    return `{${objResult}}`;
  }

  throw new Error(`Unsupported data type: ${typeof value}`);
}

console.log(myStringify(obj));

// What if there is circular dependency ?
obj.circularRef = obj;

try {
  const output = myStringify(obj);
  console.log(output);
} catch (error) {
  console.error(error.message);
}
