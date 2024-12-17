//Task Addition and Display
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


function addTask() {
    taskText = taskInput;
    if (taskText !== "")   
    {
        let task = new Task(taskText)
        alert(task.taskText.value)
    }
}


function Task(taskText) {
    this.taskText = taskText;
}

