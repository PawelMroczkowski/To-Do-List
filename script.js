//Defining variables that get value from html
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


function addTask() {
    const trimmedTaskInput = taskInput.value.trim();
    const toDo  = {
        id: crypto.randomUUID(),
        taskText: trimmedTaskInput,
        completed: false
    }
    //call render task
    renderTask(toDo);
    saveTaskToLocalStorage(toDo);
}


   //save to local storage
function saveTaskToLocalStorage(toDo)   {
    let tasks = loadTasksFromLocalStorage();
    tasks.push(toDo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks === null) 
        tasks = [];
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
    let results = tasks.filter((task) => task.id !== idClicked ) 
    localStorage.setItem("tasks", JSON.stringify(results));
}



function renderTask(toDo)   {
    //if not empty then render task
    if (toDo.taskText.value !== "") {
        const listItem = document.createElement("li");
        const paragraphElement = document.createElement("p");
            listItem.appendChild(paragraphElement);
            listItem.setAttribute("class","listItem")
            listItem.setAttribute("id",toDo.id);
                paragraphElement.textContent = toDo.taskText;
                taskList.appendChild(listItem);
                taskInput.value = "";
                paragraphElement.setAttribute("class", "task");


        //render delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click",deleteTask);
            listItem.appendChild(deleteButton);   
    }
}

function clearLocalStorage()    {
    localStorage.clear();
    location.reload();
}

//render tasks from local storage 
loadTasksFromLocalStorage().forEach(task => {
    renderTask(task);    
});


//sort tasks
function sortTasksAtoZ() {
    let tasks = loadTasksFromLocalStorage();
    tasks.sort(function(a,b)    {
        if (a.taskText < b.taskText)    
            return -1;
        if (a.taskText > b.taskText)    
            return 1;
        return 0;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

function sortTasksZtoA() {
    let tasks = loadTasksFromLocalStorage();
    tasks.sort(function(b,a)    {
        if (a.taskText < b.taskText)    
            return -1;
        if (a.taskText > b.taskText)    
            return 1;
        return 0;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}