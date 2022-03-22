const addButton = document.querySelector("div.add-button");
const taskListGroup = document.querySelector(".task-list");
let taskList;

function goThroughList(taskList) {
    taskList.forEach((task,index) => {
        let listContent = taskListGroup.innerHTML
        newInput = newTask(task);
        taskListGroup.innerHTML =  listContent + newInput;
    })
}

function newTask(task) {
    taskTemplate = `
    <li class="list-group-item list-item">
        ${task}
        <button class="btn delete-button">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </li>
    `
    return taskTemplate;
}

if (localStorage.getItem("taskList") === null) {
    taskList = ["Welcome to the To Do List App", "Created by Roquito Valmoja"];
    localStorage.setItem("taskList", JSON.stringify(taskList));
} else {
    taskList = JSON.parse(localStorage.getItem("taskList"));
}

goThroughList(taskList);


addButton.addEventListener("click", (e) => {
    const taskInput =  document.querySelector("input.task-input-box");
    
    let newInput = taskInput.value;
    taskList.push(newInput);
    localStorage.setItem("taskList", JSON.stringify(taskList));

    let listContent = taskListGroup.innerHTML
    newInput = newTask(newInput);
    taskListGroup.innerHTML =  listContent + newInput;

    taskInput.value = "";
    e.preventDefault();
});

document.addEventListener("click", (e) => {


    if (e.target.className === "fa-solid fa-xmark") {
        taskList.forEach((task,index) => {
            if (task === e.path[2].innerText) {
                taskList.splice(index, 1);
            }
            localStorage.setItem("taskList", JSON.stringify(taskList));
        });

        taskList = JSON.parse(localStorage.getItem("taskList"));

        taskListGroup.innerHTML = "";

        goThroughList(taskList)

    }
});

