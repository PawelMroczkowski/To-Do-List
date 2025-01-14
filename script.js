//Defining variables that get value from html
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

//take input value and use to create object with generated id
function addTask() {
  const trimmedTaskInput = taskInput.value.trim();
  const toDo = {
    id: crypto.randomUUID(),
    taskText: trimmedTaskInput,
    completed: false,
  };
  //call render task
  renderTask(toDo);
  saveTaskToLocalStorageToDo(toDo);
}

//save to local storage
function saveTaskToLocalStorageToDo(toDo) {
  let tasks = loadTasksFromLocalStorage();
  tasks.push(toDo);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//loading from local storage
function loadTasksFromLocalStorage() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null) tasks = [];
  return tasks;
}

//Task Deletion from render and local storage
function deleteTask(event) {
  const task = event.target.parentElement;
  taskList.removeChild(task);
  const listItemId = event.target.parentElement.id;
  removeTaskInLocalStorage(listItemId);
}

//Remove item from local storage
function removeTaskInLocalStorage(listItemId) {
  const idClicked = listItemId;
  let tasks = loadTasksFromLocalStorage();
  let resultTasks = tasks.filter((task) => task.id !== idClicked);
  localStorage.setItem("tasks", JSON.stringify(resultTasks));
}

//render task
function renderTask(toDo) {
  if (toDo.taskText.value !== "") {
    const listItem = document.createElement("li");
    const paragraphElement = document.createElement("p");
    listItem.appendChild(paragraphElement);
    listItem.classList.add("listItem");
    listItem.setAttribute("id", toDo.id);
    paragraphElement.textContent = toDo.taskText;
    taskList.appendChild(listItem);
    taskInput.value = "";
    paragraphElement.setAttribute("class", "task");

    //render delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTask);
    listItem.appendChild(deleteButton);

    //render checkbox
    const checkboxCompleted = document.createElement("input");
    checkboxCompleted.setAttribute("type", "checkbox");
    checkboxCompleted.setAttribute("class", "checkboxes");
    checkboxCompleted.addEventListener("click", completedTaskToggle);
    listItem.appendChild(checkboxCompleted);
  }
}

//Clear Local Storage
function clearLocalStorage() {
  localStorage.clear();
  location.reload();
}


//sorting alphabetically from A to Z
function sortTasksAtoZ() {
  let tasks = loadTasksFromLocalStorage();
  tasks.sort(function (a, b) {
    if (a.taskText < b.taskText) return -1;
    if (a.taskText > b.taskText) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.reload();
}

//sorting alphabetically from Z to A
function sortTasksZtoA() {
  let tasks = loadTasksFromLocalStorage();
  tasks.sort(function (b, a) {
    if (a.taskText < b.taskText) return -1;
    if (a.taskText > b.taskText) return 1;
    return 0;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.reload();
}

//changes completed attribute of signle object and saves to local storage
function completedTaskToggle(event) {
  let tasks = loadTasksFromLocalStorage();
  let isChecked = event.target.checked;
  let targetId = event.target.parentElement.id;
  let taskChecked;

  if (isChecked == true) {
    taskChecked = tasks.filter(function (task) {
      task.completed = true;
      return task.id == targetId;
    });

    event.target.parentElement.classList.add("completed");
    if (event.target.parentElement.classList.contains("uncompleted")) {
      event.target.parentElement.classList.remove("uncompleted");
    }
      tasks.concat(taskChecked);
      localStorage.setItem("tasks", JSON.stringify(tasks));
 
    // $("#event.target.parentElement").addClass("completed");
  } else {
    taskChecked = tasks.filter(function (task) {
      task.completed = false;
      return task.id == targetId;
    });

    event.target.parentElement.classList.add("uncompleted");
    if (event.target.parentElement.classList.contains("completed")) {
      event.target.parentElement.classList.remove("completed");
    }
    tasks.concat(taskChecked);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}



//render tasks from local storage
loadTasksFromLocalStorage().forEach((task) => {
  renderTask(task);
});

//use completed object attribute to render if task is completed in html