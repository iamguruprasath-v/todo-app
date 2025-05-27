function setItem(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function createNewElement(element, classes = [], text = "") {
    let elem = document.createElement(element);
    classes.forEach(cls => {
        elem.classList.add(cls);
    });
    if(element === "input") {
        elem.value = text;
    } else if (element === "img") {
        elem.src = text;
    } else {
        elem.innerText = text;
    }
    return elem;
}

function setActionButtons(parent) {
    let addButton = createNewElement('button');
    let editButton = createNewElement('button');
    let deleteButton = createNewElement('button');

    editButton.innerHTML = '<i class="fa-solid fa-pen"></i>'
    addButton.innerHTML = '<i class="fa-duotone fa-solid fa-circle-check"></i>'
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

    addButton.classList.add('add-btn');
    editButton.classList.add('edit-btn');
    deleteButton.classList.add('delete-btn');

    addButton.setAttribute('disabled', true);

    parent.appendChild(editButton);
    parent.appendChild(addButton);
    parent.appendChild(deleteButton);
}

function getAllTasks() {
    let allTasks = localStorage.getItem('tasks')

    if (allTasks === null) {
        allTasks = [];
    } else {
        allTasks = JSON.parse(allTasks);
    }

    return allTasks;
}

function saveNewTask(newTask) {
    let newCreatedTask = {
        taskName: newTask,
        taskCompletedStatus: false
    }

    let allTasks = getAllTasks();
    allTasks.push(newCreatedTask);
    setItem('tasks', allTasks);
}

function deleteTask(taskName) {
    let allTasks = getAllTasks();
    let modifiedTasks = allTasks.filter((task) => {
        if (task.taskName != taskName) return task;
    })

    setItem('tasks', modifiedTasks);
}

function arrangingProcessOfRows(task, loopIndex, status) {
    let taskRow = createNewElement('tr');
    let taskId = createNewElement('td', [], loopIndex + 1);
    let taskName = createNewElement('td', [], task.taskName);
    let taskStatus = createNewElement('td');

    taskStatus.innerHTML = `
      <div class="toggle" >
        <div class="toggle-button" data-status= ${status}></div>
      </div>`;

    let actionButtons = createNewElement('td', ['actions']);
    setActionButtons(actionButtons);

    taskRow.appendChild(taskId);
    taskRow.appendChild(taskName);
    taskRow.appendChild(taskStatus);
    taskRow.appendChild(actionButtons);

    return taskRow;
}

function updateTaskStatus(taskName, taskStatus) {
    let allTasks = getAllTasks();
    console.log(taskName, taskStatus)
    let task = allTasks.find(task => task.taskName == taskName);
    console.log(task)
    task.taskCompletedStatus = taskStatus;
    setItem('tasks', allTasks);
}

function updateTask(oldTaskName, newTaskName) {
    debugger
    console.log(`OldTaskname: ${oldTaskName}\n NewTaskName: ${newTaskName}`);
    let allTasks = getAllTasks();
    console.log("BeforeUpdateTasks: ")
    allTasks.forEach((task) => {
        console.log(task.taskName);
    })
    console.log(`FoundedTask: ${allTasks.find(task => task.taskName == oldTaskName)}`);
    console.log(`FoundedTaskName: ${allTasks.find(task => task.taskName == oldTaskName).taskName}`);
    allTasks.find(task => task.taskName == oldTaskName).taskName = newTaskName;
    console.log("AfterUpdateTasks: ")
    allTasks.forEach((task) => {
        console.log(task.taskName);
    })
    setItem('tasks', allTasks);
}

export default {
    createNewElement,
    setActionButtons,
    getAllTasks,
    saveNewTask,
    deleteTask,
    arrangingProcessOfRows,
    updateTaskStatus,
    updateTask,
}