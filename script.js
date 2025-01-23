//Defining variables that get value from html
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

//take input value and use to create object with generated id
function addTask() {
  const trimmedTaskInput = taskInput.value.trim();
  const task = {
    id: crypto.randomUUID(),
    taskText: trimmedTaskInput,
    completed: false,
  };
  //call render task
  renderTask(task);
  saveTaskToLocalStorageToDo(task);
}

//save to local storage
function saveTaskToLocalStorageToDo(task) {
  let tasks = loadTasksFromLocalStorage();
  tasks.push(task);
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
function renderTask(task) {
  if (task.taskText.value !== "") {
    const listItem = document.createElement("li");
    const paragraphElement = document.createElement("p");
    listItem.appendChild(paragraphElement);
    listItem.classList.add("listItem");
    listItem.setAttribute("id", task.id);
    paragraphElement.textContent = task.taskText;
    taskList.appendChild(listItem);
    taskInput.value = "";
    paragraphElement.setAttribute("class", "task");

    //render edit button
    const editTaskButton = document.createElement("button");
    editTaskButton.textContent = "Edit: ";
    editTaskButton.addEventListener("click", editTask);
    listItem.appendChild(editTaskButton);

    //render delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTask);
    listItem.appendChild(deleteButton);

    //render checkbox
    const checkboxCompletedButton = document.createElement("input");
    checkboxCompletedButton.setAttribute("type", "checkbox");
    checkboxCompletedButton.setAttribute("class", "checkboxes");
    checkboxCompletedButton.addEventListener("click", completedTaskToggle);
    listItem.appendChild(checkboxCompletedButton);
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

//render tasks from local storage
loadTasksFromLocalStorage().forEach((task) => {
  renderTask(task);
});

//completed functionality
function completedTaskToggle(event) {
  let tasks = loadTasksFromLocalStorage();
  let isChecked = event.target.checked;
  let targetId = event.target.parentElement.id;
  let taskChecked;
  if (isChecked) {
    taskChecked = tasks.filter((task) => task.id == targetId)[0];
    taskChecked.completed = true;
    tasks.concat(taskChecked);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.target.parentElement.classList.add("completed");
    if (event.target.parentElement.classList.contains("uncompleted")) {
      event.target.parentElement.classList.remove("uncompleted");
    }
  } else if (!isChecked) {
    taskChecked = tasks.filter((task) => task.id == targetId)[0];
    taskChecked.completed = false;
    tasks.concat(taskChecked);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.target.parentElement.classList.add("uncompleted");
    if (event.target.parentElement.classList.contains("completed")) {
      event.target.parentElement.classList.remove("completed");
    }
  }
}

function editTask(event) {
  //load tasks and define variables to filter edited item by id
  let tasks = loadTasksFromLocalStorage();
  let taskToEdit;
  let targetId = event.target.parentElement.id;
  taskToEdit = tasks.filter((task) => task.id == targetId)[0];
  //create html elements - input window
  let editWindow = document.createElement("input");
  editWindow.setAttribute("type", "text");
  editWindow.setAttribute("class", "editText");
  editWindow.defaultValue = taskToEdit.taskText;
  event.target.parentElement.appendChild(editWindow);

  //create apply button
  let editWindowApplyButton = document.createElement("button");
  editWindowApplyButton.textContent = "Apply";
  event.target.parentElement.appendChild(editWindowApplyButton);
  editWindowApplyButton.addEventListener("click", applyEdit);
}

function applyEdit(event) {
  let tasks = loadTasksFromLocalStorage();
  let targetId = event.target.parentElement.id;
  let taskToEdit;
  taskToEdit = tasks.filter((task) => task.id == targetId)[0];

  // let editedTaskText = document
  //   .getElementById(targetId)
  //   .getElementsByClassName("editText")[0].value;
  let editedTaskText = event.target.parentElement.getElementsByClassName("editText")[0].value;
  taskToEdit.taskText = editedTaskText;
  console.log(taskToEdit);
  tasks.concat(taskToEdit);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  location.reload();
}
