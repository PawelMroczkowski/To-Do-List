//Task Addition and Display
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
let a=0;
function addTask() {
    const toDo  = {
        id: ++a,
        taskText: taskInput.value.trim()
    }



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
        deleteButton.addEventListener("click",deleteTask);
        listItem.appendChild(deleteButton);


        
    }
    const toDoStringified = JSON.stringify(toDo);
    const tasks = [];

    for (let i=0; i < toDoStringified.length; i++) {
        tasks.push(toDoStringified[i].textContent);
    }
    localStorage.setItem(toDo.id, toDoStringified);


   
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

