import utils from './utils.js';

const tableBody = document.getElementById('task-table-content');
const taskInput = document.getElementById('task-input');
const saveButton = document.getElementById('save');
const threshHold = document.getElementById('par-line');


// Rendering the available Tasks
let allTasks = utils.getAllTasks();
let activeTasks = allTasks.filter(task => task.taskCompletedStatus == false);
let completedTasks = allTasks.filter(task => task.taskCompletedStatus == true);


renderActiveTasks(activeTasks);
renderCompletedTasks(completedTasks);
applyInitialToggleStyles();
bindToggleEvents(); 

function renderActiveTasks(tasks) {
  for (let loopIndex = 0; loopIndex < tasks.length; loopIndex++) {
    let task = tasks[loopIndex];
    let taskRow = utils.arrangingProcessOfRows(task, loopIndex, 'false');
    threshHold.before(taskRow);
  }

}

function renderCompletedTasks(tasks) {
  for (let loopIndex = tasks.length; loopIndex > 0; loopIndex--) {
    let task = tasks[tasks.length - loopIndex];
    let taskRow = utils.arrangingProcessOfRows(task, loopIndex - 1, 'true');
    threshHold.after(taskRow)
  }


}

function applyInitialToggleStyles() {
  const toggles = document.querySelectorAll('.toggle');

  toggles.forEach((toggle) => {
    const toggleBtn = toggle.querySelector('.toggle-button');
    const isToggled = toggleBtn.dataset.status == 'true';
    toggleBtn.style.transform = isToggled ? 'translateX(20px)' : 'translateX(0)';
    toggle.style.backgroundColor = isToggled ? 'grey' : 'transparent';
  });
}

function bindToggleEvents() {
  const toggleStatusElements = document.querySelectorAll('.toggle');

  toggleStatusElements.forEach((toggle, index) => {
    toggle.addEventListener('click', () => {
      if (confirm("Are you confirm to update the status?")){
        const toggleBtn = toggle.querySelector('.toggle-button');

        const isToggled = toggleBtn.dataset.status == 'true';
        const newStatus = !isToggled;
        toggleBtn.dataset.status = newStatus.toString();
        toggleBtn.style.transform = newStatus ? 'translateX(20px)' : 'translateX(0)';
        toggle.style.backgroundColor = newStatus ? 'grey' : 'transparent';

        const taskRow = toggle.closest('tr');
        const taskName = taskRow.children[1].innerText;

        utils.updateTaskStatus(taskName, newStatus); // You’ll need to implement this in utils.js
        location.reload();
      }
    });
  });
}

saveButton.addEventListener('click', (e) => {
  if (taskInput.value !== '') {
    utils.saveNewTask(taskInput.value);
    taskInput.value = '';
    window.location.reload();
  }
})

taskInput.addEventListener('focus', () => {
    taskInput.setAttribute('placeholder', 'Enter task name');
    taskInput.parentElement.parentElement.classList.remove('task-creation');
    taskInput.parentElement.parentElement.classList.add('another-opacity');
    saveButton.children[0].removeAttribute('disabled');

});

taskInput.addEventListener('blur', () => {
    taskInput.setAttribute('placeholder', 'Click here - Task creation');
    taskInput.parentElement.parentElement.classList.remove('another-opacity');
    taskInput.parentElement.parentElement.classList.add('task-creation');
});

function deleteTask(button) {
  let row = button.closest('tr');
  if (confirm('Are you sure want to Delete?')) {
    utils.deleteTask(row.children[1].innerText)
    location.reload();
  }
}

function editTask(button) {
  let row = button.closest('tr');
  let addButton = row.querySelector('.add-btn');
  let taskNameField = row.children[1];
  let taskValue = taskNameField.innerText;
  addButton.removeAttribute('disabled');
  taskNameField.setAttribute('contentEditable', true);
  taskNameField.focus();

  function updateTaskEventListener() {
    let value = taskNameField.innerText;
    taskNameField.removeAttribute('contentEditable');
    addButton.setAttribute('disabled', true);
    addButton.removeEventListener('click', updateTaskEventListener);
    if(value == '') return;
    utils.updateTask(taskValue, taskNameField.innerText);
    // location.reload();
  }

  addButton.addEventListener('click', updateTaskEventListener)
}

tableBody.addEventListener('click', (e) => {

  let target = e.target;
  let button = target.closest('button');

  if(button.classList.contains('delete-btn')) {
    console.log(1)
    deleteTask(button);
  }
  if(button.classList.contains('edit-btn')) {
    console.log(1)
    editTask(button);
  }
})
