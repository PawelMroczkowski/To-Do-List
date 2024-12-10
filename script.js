//Task Addition and Display
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText=taskInput.value.trim();
    if (taskText !== "") {
        const listItem = document.createElement("li");
        const paragraphElement = document.createElement("p");
                //task completion
               // listItem.addEventListener("click" , completeTask);
             
        listItem.appendChild(paragraphElement);
        paragraphElement.textContent = taskText;
        taskList.appendChild(listItem);
        taskInput.value = "";
        


        //task delete
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click",deleteTask);
        listItem.appendChild(deleteButton);
    }

    saveTaskToLocalStorage();
}



//Task Completion
function completeTask(event) {
    const task = event.target;
    task.classList.toggle("completed");
}

//Task Deletion
function deleteTask(event) {
    const task = event.target.parentElement;
    taskList.removeChild(task);
    saveTaskToLocalStorage();
}

//Save Tasks to local storage
function saveTaskToLocalStorage() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName("p");

    for (let i=0; i < taskItems.length; i++) {
        tasks.push(taskItems[i].textContent);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(taskText => {
            const listItem = document.createElement("li");
            const paragraphElement = document.createElement("p");
            listItem.appendChild(paragraphElement);
            paragraphElement.textContent = taskText; // listItem.textContent = taskText;
            taskList.appendChild(listItem);
            listItem.addEventListener("click", completeTask);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", deleteTask);
            listItem.appendChild(deleteButton);
        })

    }
}

function clearLocalStorage()    {
    localStorage.clear();
    location.reload();
}


loadTasksFromLocalStorage();
