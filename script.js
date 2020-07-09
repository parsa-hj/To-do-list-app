//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodoFromLStrg);

//Functions
function addTodo(event) {
  event.preventDefault();
  console.log("hello");
  if (todoInput.value !== "") {
    // 1.Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // 2.Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // 3. Add to do to lacal storage by saveLocalTodos function
    saveLocalTodos(todoInput.value);

    // 4.Create Check Mark Button
    const completeButton = document.createElement("Button");
    completeButton.innerHTML = '<i class="fas fa-check"><i/>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // 5.Create Trash Button
    const trashButton = document.createElement("Button");
    trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // 6.APPEND To UL
    todoList.appendChild(todoDiv);

    // 7.Clear The Input Feild and Focus On It
    todoInput.value = "";
    todoInput.focus();
  }
}

function deleteCheck(e) {
  console.log(e.target.classList[0]);
  const item = e.target;

  // DELETE TODO
  if (item.classList[0] == "trash-btn") {
    item.parentElement.classList.add("fall");

    // Remove From Lacal Storage by removeTodoFromLStrg Function
    removeTodoFromLStrg(item.parentElement);

    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }

  // CHECK TODO
  if (item.classList[0] == "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const myOptions = todoList.childNodes;
  console.log(myOptions);

  //Looping through myOptions
  myOptions.forEach(function (option) {
    switch (e.target.value) {
      //When I Click on All the e.target.value = all
      case "all":
        option.style.display = "flex";
        break;

      case "completed":
        if (option.classList.contains("completed")) {
          option.style.display = "flex";
        } else {
          option.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!option.classList.contains("completed")) {
          option.style.display = "flex";
        } else {
          option.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(newTodo) {
  //CHECK ... DO I already have things in there ..!?
  let todos;

  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
  todos.push(newTodo);
  
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodoFromLStrg() {
  //CHECK ... DO I already have things in there ..!?
  let todos;

  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todoFromLocalStorage) {
    // 1.Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // 2.Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoFromLocalStorage; // <== تم التغيير
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // 4.Create Check Mark Button
    const completeButton = document.createElement("Button");
    completeButton.innerHTML = '<i class="fas fa-check"><i/>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // 5.Create Trash Button
    const trashButton = document.createElement("Button");
    trashButton.innerHTML = '<i class="fas fa-trash"><i/>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // 6.APPEND To UL
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromLStrg(todo) {
  
  //CHECK ... DO I already have things in there ..!?
  let todos;

  
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {

    todos = JSON.parse(localStorage.getItem("todos"));
  }

 
  console.log(todo.children[0].innerText);
  const todoTextContent = todo.children[0].innerText;

  
  console.log(todos.indexOf(todoTextContent));
  todos.splice(todos.indexOf(todoTextContent), 1);

  
  localStorage.setItem("todos", JSON.stringify(todos));
}
