import utils from './utils.js';

const addNewButton = document.getElementById('add-new');
const tableBody = document.getElementById('task-table-content');
const toggleStatus = document.getElementById('toggle-status');
const toggleBtn = document.getElementById('toggle-button');
const taskInput = document.getElementById('task-input');

let allTasks = utils.getAllTasks();
console.log(allTasks);
renderAllTasks(allTasks);

function renderAllTasks(tasks) {
    for (let loopIndex = 0; loopIndex < tasks.length; loopIndex++) {
        let task = tasks[loopIndex];
        let taskRow = utils.createNewElement('tr');
        let taskId = utils.createNewElement('td', [], loopIndex+1);
        let taskName = utils.createNewElement('td', [], task.taskName);
        let taskStatus = utils.createNewElement('td');
        taskStatus.innerHTML = task.status === 'true' ? '<div class="toggle" id="toggle-status"><div class="toggle-button" data-status = "true"></div></div>' : '<div class="toggle" id="toggle-status"><div class="toggle-button" data-status = "false"></div></div>';
        let actionButtons = utils.createNewElement('td', ['actions']);
        utils.setActionButtons(actionButtons);
        taskRow.appendChild(taskId);
        taskRow.appendChild(taskName);
        taskRow.appendChild(taskStatus);
        taskRow.appendChild(actionButtons);
        tableBody.insertAdjacentElement('afterbegin', taskRow);
    }
}

let isToggled = false;

taskInput.addEventListener('focus', () => {
    taskInput.setAttribute('placeholder', 'Enter task name');

});
taskInput.addEventListener('blur', () => {
    taskInput.setAttribute('placeholder', 'Click here - Task creation');
});

toggleStatus.addEventListener('click', () => {
    isToggled = !isToggled;
  
    if (isToggled) {
      toggleBtn.style.transform = 'translateX(20px)';
      toggleStatus.style.backgroundColor = 'grey';
    } else {
      toggleBtn.style.transform = 'translateX(0)';
      toggleStatus.style.background = 'transparent';
    }
  });
