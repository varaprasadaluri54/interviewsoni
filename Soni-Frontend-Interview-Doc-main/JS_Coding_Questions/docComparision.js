// Question
// level ->>> Hard
// Asked in Google


// // How can you compare two deeply nested JSON objects to identify their 
// // differences,ensuring that each differing key is represented with a 
// // "from and to" for string, number, and object data types?

// // If key is not present in one of obj then print "EMPTY" (see hobbies and 
// // country)

// const doc1 = {
//   name: "John",
//   age: 12,
//   address: {
//     city: "Boston",
//     zip: "10001",
//     country: "USA",
//   },
//   phone: "987-654-3210",
//   friends: {
//     friend1: { name: "Alice", age: 30 },
//     friend2: { name: "Bob", age: 25 }
//   },
//   hobbies: ["table tennis"]
// };

// const doc2 = {
//   name: "John",
//   age: 14,
//   address: {
//     city: "New York",
//     zip: "10001",
//     country: "Canada",
//   },
//   phone: "123-456-7890",
//   friends: {
//     friend1: { name: "Alice", age: 30 },
//     friend2: { name: "Bob", age: 26 }
//   },
//   country: "India"
// };

// function getDifference(doc1, doc2) {
//    // write code here
// }

// // const difference = getDifference(doc1, doc2);

// // Output
// {
//   age: { from: 12, to: 14 },
//   address: {
//     city: { from: 'Boston', to: 'New York' },
//     country: { from: 'USA', to: 'Canada' }
//   },
//   phone: { from: '987-654-3210', to: '123-456-7890' },
//   friends: { friend1: {}, friend2: { age:  {from: 25, to: 26} } },
//   hobbies: { from: [ 'table tennis' ], to: 'EMPTY' },
//   country: { to: 'India', from: 'EMPTY' }
// }





// Solution

function compareObjects(obj1, obj2 ) {
	const difference = {};
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  const compareKeys = (key, obj1, obj2, parent) => {
    if (!(key in obj1)) {
      // Key added in obj2
      parent[key] = { to: obj2[key], from: "EMPTY" };
    } else if (!(key in obj2)) {
      // Key removed from obj1
      parent[key] = { from: obj1[key], to: "EMPTY" };
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null &&
      typeof obj2[key] === 'object' && obj2[key] !== null) {
      // Recurse if both values are objects
      parent[key] = compareObjects(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
      parent[key] = { from: obj1[key], to: obj2[key] };
    }
  };
  keys.forEach(key => compareKeys(key, obj1, obj2, difference));

  return difference;
}

const diff = compareObjects(doc1, doc2)



