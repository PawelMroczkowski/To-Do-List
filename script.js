//Task Addition and Display
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");



function addTask() {
    const trimmedTaskInput = taskInput.value.trim();
    const toDo  = {
        id: crypto.randomUUID(),
        taskText: trimmedTaskInput
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


//Task Deletion from render
function deleteTask(event) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
    
}

const recreatedToDo = {};

//Remove item from local storage
function removeTaskInLocalStorage() {


    const idClicked = document.getElementsByTagName('p')[0].id
    let tasks = loadTasksFromLocalStorage();
    let results = tasks.filter((task) => task.id !== idClicked )
       
    //if id = get from document
    //delete ToDo
    localStorage.setItem("tasks", JSON.stringify(results));
}



function clearLocalStorage()    {
    localStorage.clear();
    location.reload();
}


function renderTask(toDo)   {
    //if not empty then render task
    if (toDo.taskText.value !== "") {
        const listItem = document.createElement("li");
        const paragraphElement = document.createElement("p");
        listItem.appendChild(paragraphElement);
        paragraphElement.textContent = toDo.taskText;
        taskList.appendChild(listItem);
        taskInput.value = "";
        paragraphElement.setAttribute("id",toDo.id);
        paragraphElement.setAttribute("class", "task");


        //render delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("id","delete_"+toDo.id);
        deleteButton.addEventListener("click",deleteTask);
        listItem.appendChild(deleteButton);   
    }
}

//render tasks from local storage 
loadTasksFromLocalStorage().forEach(task => {
    renderTask(task);    
});



removeTaskInLocalStorage();