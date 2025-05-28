// Question
// Level ->>> Hard
// Asked in Rippling, Uber and Amazon

// How can you resolve task dependencies in a directed acyclic graph
//  and execute tasks in parallel with a concurrency limit?
 
//  function taskA(done) {
//   console.log("Task A Completed");
//   done();
// }
// function taskB(done) {
//   setTimeout(() => {
//     console.log("Task B Completed");
//     done();
//   }, 2000);
// }
// function taskC(done) {
//   setTimeout(() => {
//     console.log("Task C Completed");
//     done();
//   }, 200);
// }
// function taskD(done) {
//   console.log("Task D Completed");
//   done();
// }
// function taskE(done) {
//   console.log("Task E Completed");
//   done();
// }

// const asyncGraph = {
//   e: {
//     dependency: ["c", "d"],
//     task: taskE,
//   },
//   c: {
//     task: taskC,
//   },
//   d: {
//     dependency: ["a", "b"],
//     task: taskD,
//   },
//   a: {
//     task: taskA,
//   },
//   b: {
//     task: taskB,
//   },
// };
// // e must be resolved before c & d
// // c no dependency
// // d must be resolved before a & b
// // a no dependency
// // b no depedency

// // first resolve dependency and then run task in parallel.
// // taskOrder -> pass an array with resolved dependency
// executeTasksInParallel(taskOrder, asyncGraph, 2).then(() => {
//   console.log("All tasks completed.");
// });

// Output
// // Task A Completed
// // Task C Completed
// // Task D Completed
// // Task E Completed
// // Task B Completed
// // All tasks completed.




//Solution

//first try to resolve dependency using topologic sorting
function resolveDependencies(graph) {
    const graphNodes = Object.keys(graph);
    const adjList = new Map();
    const inDegree = new Map();
    const topologicalOrder = [];
  
    // Build adjacency list and in-degree map
    for (const node of graphNodes) {
      const { dependency } = graph[node] || {};
      for (const dep of dependency || []) {
        const neighbors = adjList.get(dep) || [];
        neighbors.push(node);
        adjList.set(dep, neighbors);
      }
      inDegree.set(node, (dependency ? dependency.length : 0));
    }
  
    // Perform topological sort
    const queue = [];
    for (const node of graphNodes) {
      //start adding nodes which has no dependency
      if (inDegree.get(node) === 0) {
        queue.push(node);
      }
    }
  
    while (queue.length > 0) {
      const current = queue.shift();
      topologicalOrder.push(current);
  
      const neighbors = adjList.get(current) || [];
      // look around it dependent neighbour
      for (const neighbor of neighbors) {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }
  
    return topologicalOrder;
  }
  
  //Then execute task in parallel
  function executeTasksInParallel(order, graph, limit = 2) {
    let activeTasks = 0;
    let index = 0;
  
    return new Promise((resolve) => {
      const results = [];
  
      function executeNext() {
        if (index >= order.length && activeTasks === 0) {
          resolve(results); // All tasks are done
          return;
        }
  
        while (index < order.length && activeTasks < limit) {
          const currentTask = order[index];
          index++;
          activeTasks++;
  
          graph[currentTask].task(() => {
            console.log(`${currentTask} completed.`);
            activeTasks--;
            executeNext(); // Check for the next task
          });
        }
      }
  
      executeNext();
    });
  }
  
  const taskOrder = resolveDependencies(asyncGraph)
  executeTasksInParallel(taskOrder, asyncGraph, 2).then(() => {
    console.log("All tasks completed.");
  });
  
  
  
  