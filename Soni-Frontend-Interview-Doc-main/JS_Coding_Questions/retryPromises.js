// Questions
// Level ->> Medium
// Asked in Agoda , Tekion

// How can you implement a retry mechanism for fetching data?

// function retryPromise(fn, retries = 3, delay = 1000) {
//     // write code here
// }

// // mock fetch data
// const fetchData = () => {
//   return new Promise((resolve, reject) => {
//     // Simulate a request that might fail
//     const success = Math.random() > 0.5; // 50% chance of success
//     console.log(success, "success")
//     if (success) {
//       resolve("Data fetched successfully!");
//     } else {
//       reject("Failed to fetch data");
//     }
//   });
// };

// retryPromise(fetchData, 3, 1000)
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// Solution

function retryPromise(fn, retries = 3, delay = 1000) {
  // return promise
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      fn()
        .then(resolve)
        .catch((error) => {
          if (n <= 1) {
            reject(error); // If no retries left, reject the promise
          } else {
            setTimeout(() => {
              attempt(n - 1); // Retry the function after a delay
            }, delay);
          }
        });
    };
    attempt(retries); // Start the first attempt with the given retries
  });
}
