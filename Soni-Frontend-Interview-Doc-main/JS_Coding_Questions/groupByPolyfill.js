// Question
// Level ->> Medium
// Asked in messho
// Implement _.gropuBy from Loadsh library


// function groupBy(collection, property) {
// 	//code here
// }

// // Test with invalid input
// const result1 = groupBy(1);
// console.log(result1); // Output: {}

// // Group by a custom function
// const result2 = groupBy([6.1, 2.4, 2.7, 6.8], Math.floor);
// console.log(result2); 
// // Output: { "2": [2.4, 2.7], "6": [6.1, 6.8] }

// // Group by string property (length of the string)
// const result3 = groupBy(["one", "two", "three"], "length");
// console.log(result3); 
// // Output: { "3": ["one", "two"], "5": ["three"] }

// // Group by deep property path
// const result4 = groupBy([{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }], "a.b.c");
// console.log(result4); 
// // Output: { "1": [{ a: { b: { c: 1 } } }], "2": [{ a: { b: { c: 2 } } }] }




//Solution

function groupBy(collection, property) {
    // Ensure the collection is valid
    if (typeof collection !== 'string' && !Array.isArray(collection) ) {
      return {};
    }
  
    // Helper function to get key
    const getKey = (item) => {
      if (typeof property === 'function') {
        return property(item); 
      } else if (typeof property === 'string') {
        // Resolve deep property paths (e.g., "p.q.r")
        const keys = property.split('.');
        let value = item;
        for (const key of keys) {
          value = value[key];
        }
        return value;
      }
    };
  
    // Initialize the output object
    const output = {};
  
    // Iterate through the collection and group items by key
    for (const item of collection) {
      const key = getKey(item);
  
      // Create a new group if the key doesn't exist
      if (!output[key]) {
        output[key] = [];
      }
  
      // Add the item to the corresponding group
      output[key].push(item);
    }
    return output;
  }

  