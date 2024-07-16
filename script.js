let addTodo = document.getElementById("add_btn_id");
let form = document.getElementsByClassName("todo_form")[0];
let input = document.getElementById("todo_input");
let error_msg = document.getElementById("error_msg");
let clearAll = document.getElementById("btn_clear");
let allTodoList = document.getElementsByClassName("todoImg");
let toDoList = [];

/* since toDoList was again initialized as empty array upon window reload, this ensures todoList retrives values from
 local storage if window is reloaded*/
function retrieveTodoReload() {
  if (localStorage.getItem("todos") == null) {
    toDoList = [];
  } else {
    toDoList = [...JSON.parse(localStorage.getItem("todos"))];
  }
  return toDoList;
}
retrieveTodoReload();

/*  function to clear todolist, eachtime the list is shown using foreach loop, this clears the list so that no duplication is found */
function clearTodos() {
  document.getElementById("todo_list").innerHTML = "";
}

function checkEmptyValue(check_value) {
  if (!check_value) {
    error_msg.innerHTML = " * enter a todo to continue *";
    return false;
  } else {
    error_msg.innerHTML = "";
  }
  return check_value;
}

function addTodotoStorage(toDoList){
  localStorage.setItem("todos", JSON.stringify(toDoList));
}

// prints todo that are in local storage
function printTodo(toDoListPrintTODo) {
  if (localStorage.getItem("todos")) {
    parsedTodo = toDoListPrintTODo;

    parsedTodo.forEach((element) => {
      document.getElementById("todo_list").insertAdjacentHTML(
        "beforeend",
        `<li>
    <div class="todoDiv">
    
    <div  class="todoDivLeft"> <img class="todoImg" src="./images/check_green.png" alt="" width="40px" onclick="removeThistodo(event)"> </div>
    <div class="todoDivRight"><p>${element.toDoContent}</p></div>
    </div>
    </li>`
      );
      return parsedTodo;
    });
  }
}

// adds todo to localstorage
function addTodotoArray(toDo) {
  let todoObj = {
    toDoContent: " ",
  };
  let checked_todo = checkEmptyValue(toDo);

  todoObj.toDoContent = checked_todo;
  toDoList = retrieveTodoReload();
  toDoList.unshift(todoObj);

  if (checked_todo !== false) {
    addTodotoStorage(toDoList)
  }
}

// event listener for adding todo in local Storage
addTodo.addEventListener("click", function (event) {
  event.preventDefault();
  todoInput = checkEmptyValue(input.value);
  addTodotoArray(todoInput);
  form.reset();
  clearTodos();
  printTodo(toDoList);
});
clearTodos();
printTodo(toDoList);

// clears all todo list
clearAll.addEventListener("click", function (event) {
  localStorage.clear();
  clearTodos();
  toDoList = [];
});

function removeThistodo(event) {
  let abc =
    event.target.parentElement.parentElement.childNodes[3].childNodes[0].innerHTML;

  toDoList.forEach((element) => {
    index = toDoList.indexOf(element);
    if (element.toDoContent === abc) {
      toDoList.splice(index, 1);
    }
    clearTodos();
    addTodotoStorage(toDoList);
    printTodo(toDoList);
  });
}
