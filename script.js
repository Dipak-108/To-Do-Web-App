let addTodo = document.getElementById("add_btn_id");
let form = document.getElementsByClassName("todo_form")[0];
let input = document.getElementById("todo_input");
let error_msg = document.getElementById("error_msg");
let clearAll = document.getElementById("btn_clear");
let toDoList=[];

// since toDoList was emptied upon window reload, this ensures todoList retrives values from
// local storage if window is reloaded
function retrieveTodoReload(){
  if(localStorage.getItem("todos")==null){
     toDoList=[];
  }
  
  else{
    toDoList=[...JSON.parse(localStorage.getItem("todos"))]
    
  }
  return toDoList;
};
retrieveTodoReload()




// function to clear todolist, eachtime the list is shown using foreach loop, this clears the
// list so that no duplication is found
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

function printTodo() {
  if (localStorage.getItem("todos")) {
    parsedTodo = JSON.parse(localStorage.getItem("todos"));
    

    parsedTodo.forEach((element) => {
      document.getElementById("todo_list").insertAdjacentHTML(
        "beforeend",
        `<li>
    <div class="todoDiv">
    
    <div  class="todoDivLeft"> <img src="./images/check_green.png" alt="" width="40px"> </div>
    <div class="todoDivRight"><p>${element.toDoContent}</p></div>
    </div>
    </li>`
      );
      return parsedTodo;
    });
  }
}

function addTodotoStorage(toDo) {
  
  let todoObj = {
    toDoContent: " ",
    isComplete: false,
  };

  todoObj.toDoContent = toDo;

  toDoList=retrieveTodoReload();
  toDoList.unshift(todoObj);

  if (toDo !== false) {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  }
  return toDoList;

}

// event listener for adding todo in local Storage
addTodo.addEventListener("click", function (event) {
  event.preventDefault();
  todoInput = checkEmptyValue(input.value);
  addTodotoStorage(todoInput);
  form.reset();
  clearTodos();
  printTodo();
});
clearTodos();
printTodo();

clearAll.addEventListener("click", function (event) {
  localStorage.clear();
  clearTodos();
  toDoList = [];
});


// document.getElementsByClassName("todoDivLeft").addEventListener("click",function (event){
//   console.log(this.event);
// })

