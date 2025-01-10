//Task Addition and Display
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let a=0;


function addTask() {
    const trimmedTaskInput = taskInput.value.trim();
    const toDo  = {
        id: trimmedTaskInput[0] + ++a + trimmedTaskInput[trimmedTaskInput.length-1],
        taskText: trimmedTaskInput
    }

    //call render task
    renderTask(toDo);
    saveTaskToLocalStorage(toDo);
     
}


function saveTaskToLocalStorage(toDo)   {
    //save to local storage
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




//Task Deletion
function deleteTask(event) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
    // saveTaskToLocalStorage();
}



function clearLocalStorage()    {
    localStorage.clear();
    location.reload();
}


function renderTask(toDo)   {
    //if not empty then add task and button to delete
    if (toDo.taskText.value !== "") {
        const listItem = document.createElement("li");
        const paragraphElement = document.createElement("p");
        listItem.appendChild(paragraphElement);
        paragraphElement.textContent = toDo.taskText;
        taskList.appendChild(listItem);
        taskInput.value = "";
        paragraphElement.setAttribute("id",a);
        paragraphElement.setAttribute("class", "task");


        //task delete
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("id","delete_"+a);
        deleteButton.addEventListener("click",deleteTask);
        listItem.appendChild(deleteButton);   
    }
}
