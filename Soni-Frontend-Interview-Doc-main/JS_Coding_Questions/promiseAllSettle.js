// Question
// Level ->> Medium
// function myPromiseAllSettled(taskList) {
// 	//code here
// }

// const mixedTasks = [
//   new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000)),
//   new Promise((_, reject) => setTimeout(() => reject('Error Task 2'), 500)),
//   "Immediate Value",
//   new Promise((resolve) => setTimeout(() => resolve('Task 3'), 200))
// ];

// myPromiseAllSettled(mixedTasks)
//   .then((result) => console.log(result));
  
// // Output
// // [
// //   { status: "fulfilled", value: "Task 1" },
// //   { status: "rejected", reason: "Error Task 2" },
// //   { status: "fulfilled", value: "Immediate Value" },
// //   { status: "fulfilled", value: "Task 3" }
// // ]




// Solution
function myPromiseAllSettled(taskList) {
    const result = new Array(taskList.length);
    let completed = 0;
  
    return new Promise((resolve) => {
      for (let i = 0; i < taskList.length; i++) {
        Promise.resolve(taskList[i])
          .then((value) => {
            result[i] = { status: "fulfilled", value };
          })
          .catch((reason) => {
            result[i] = { status: "rejected", reason };
          })
          .finally(() => {
            completed++;
            if (completed === taskList.length) {
              resolve(result); // Resolve when all promises settle
            }
          });
      }
    });
  }
    