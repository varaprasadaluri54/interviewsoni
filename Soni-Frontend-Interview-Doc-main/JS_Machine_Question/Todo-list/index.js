const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemCount = document.getElementById("item-count");
const allBtn = document.getElementById("all-btn");
const activeBtn = document.getElementById("active-btn");
const completedBtn = document.getElementById("completed-btn");

let todos = [];
let filter = "all";

function buildTodo() {
  list.innerHTML = "";
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    // toggling
    const toggleBtn = document.createElement("span");
    toggleBtn.textContent = todo.completed ? "✓" : "○";
    toggleBtn.className = "todo-toggle";
    toggleBtn.addEventListener("click", () => {
      todo.completed = !todo.completed;
      buildTodo();
    });

    // add txt
    const text = document.createElement("span");
    text.textContent = todo.text;
    text.className = `todo-text ${todo.completed ? "completed" : ""}`;

    // create delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "x";
    deleteBtn.className = "todo-delete";
    deleteBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      buildTodo();
    });

    //event for delete button
    li.addEventListener(
      "mouseenter",
      () => (deleteBtn.style.display = "inline")
    );
    li.addEventListener("mouseleave", () => (deleteBtn.style.display = "none"));

    li.appendChild(toggleBtn);
    li.appendChild(text);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  // Update item count
  const activeCount = todos.filter((todo) => !todo.completed).length;
  itemCount.textContent = `${activeCount} items left`;
}

function onInput(e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    todos.push({ text: input.value.trim(), completed: false });
    input.value = "";
    buildTodo();
  }
}

function onfilter(filterVal) {
  filter = filterVal;
  buildTodo();
}

function init() {
  input.addEventListener("keypress", onInput);
  [
    { btn: allBtn, filter: "all" },
    { btn: activeBtn, filter: "active" },
    { btn: completedBtn, filter: "completed" },
  ].forEach(({ btn, filter }) => {
    btn.addEventListener("click", () => onfilter(filter));
  });

  buildTodo();
}

init();
