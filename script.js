let addTodo = document.getElementById("add_btn_id");
let form = document.getElementsByClassName("todo_form")[0];
let input = document.getElementById("todo_input");
let error_msg = document.getElementById("error_msg");
let clearAll = document.getElementById("btn_clear");
let toDoList = [];

function checkEmptyValue(check_value) {
  if (!check_value) {
    error_msg.innerHTML = " * enter a todo to continue *";
    return false;
  } else {
    error_msg.innerHTML = "";
  }
  return check_value;
}

function printTodo() {
  if (localStorage.getItem("todo")) {
    localStorageTodo = localStorage.getItem("1");
    document
      .getElementById("todo_list")
      .insertAdjacentHTML("beforeend", `<li>${localStorage.getItem("1")}</li>`);
  }
}

function addTodotoStorage(toDo) {
  toDoList.unshift(toDo);
  if (toDo !== false) {
    localStorage.setItem("todo", toDoList);
  }
}

// event listener for adding todo in local Storage
addTodo.addEventListener("click", function (event) {
  event.preventDefault();
  todoInput = checkEmptyValue(input.value);
  addTodotoStorage(todoInput);
  form.reset();
  printTodo();
});
printTodo();

clearAll.addEventListener("click", function (event) {
  localStorage.clear();
  document.getElementById("todo_list").innerHTML = "";
  toDoList = [];
});
