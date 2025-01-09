//Task Addition and Display
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const toDo  = {
        taskText: taskInput.value.trim()
    }



    if (toDo.taskText.value !== "") {
        const listItem = document.createElement("li");
        const paragraphElement = document.createElement("p");
        listItem.appendChild(paragraphElement);

        paragraphElement.textContent = toDo.taskText;
        taskList.appendChild(listItem);
        taskInput.value = "";


        //task delete
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click",deleteTask);
        listItem.appendChild(deleteButton);


        
    }
    const toDoStringified = JSON.stringify(toDo);
    localStorage.setItem("toDo", toDoStringified);


   
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

