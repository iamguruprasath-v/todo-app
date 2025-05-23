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
    addButton.innerHTML = '<i class="fa-solid fa-pen"></i>'
    editButton.innerHTML = '<i class="fa-duotone fa-solid fa-circle-check"></i>'
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    parent.appendChild(addButton);
    parent.appendChild(editButton);
    parent.appendChild(deleteButton);
}

function getAllTasks() {
    let tasks = [];
    let taskCount = localStorage.length;

    for (let i = 0; i < taskCount; i++) {
        let task = {};
        console.log(localStorage.key(i));
        task.taskName = localStorage.key(i);
        task.status = localStorage.getItem(task.taskName);
        tasks.push(task);
    }

    return tasks;
}

export default {
    createNewElement,
    setActionButtons,
    getAllTasks
}