// Question
// Level ->> Medium
// function myPromiseRace(taskList) {
// 	//code here
// }

// const successRaceTasks = [
//   new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000)),
//   new Promise((resolve) => setTimeout(() => resolve('Task 2'), 500)),
//   new Promise((resolve) => setTimeout(() => resolve('Task 3'), 200)),
// ];

// myPromiseRace(successRaceTasks)
//   .then((result) => console.log(result)) // Output: "Task3"
//   .catch((error) => console.error(error));


// const errorRaceTasks = [
//   new Promise((resolve, reject) => setTimeout(() => reject('Error 1'), 500)),
//   new Promise((resolve) => setTimeout(() => resolve('Task 2'), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject('Error 2'), 200))
// ];

// myPromiseRace(errorRaceTasks)
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error)); // Output: "Error 2"




// Solution
// Custom Promie.Race
function myPromiseRace(taskList) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < taskList.length; i++) {
        Promise.resolve(taskList[i])
          .then(resolve)  // Resolve as soon as the first promise resolves
          .catch(reject); // Reject as soon as the first promise rejects
      }
    });
  }
  
  const successRaceTasks = [
    new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Task 2'), 500)),
    new Promise((resolve) => setTimeout(() => resolve('Task 3'), 200)),
  ];
  
  myPromiseRace(successRaceTasks)
    .then((result) => console.log(result)) // Output: "Task3"
    .catch((error) => console.error(error));
  
  
  const errorRaceTasks = [
    new Promise((resolve, reject) => setTimeout(() => reject('Error 1'), 500)),
    new Promise((resolve) => setTimeout(() => resolve('Task 2'), 1000)),
    new Promise((resolve, reject) => setTimeout(() => reject('Error 2'), 200))
  ];
  
  myPromiseRace(errorRaceTasks)
    .then((result) => console.log(result))
    .catch((error) => console.error(error)); // Output: "Error 2"