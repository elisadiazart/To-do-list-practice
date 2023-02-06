// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const createTasks = document.getElementById('create');
const taskContainer = document.getElementById('tasksContainer');

const taskArray = [];

const createObject = task => {
  const timeStamp = Date.now();
  const objectTask = {};
  objectTask.id = timeStamp;
  objectTask.task = task;
  objectTask.checked = false;
  taskArray.push(objectTask);
  createTask(taskArray);
};

const printTask = fragment => {
  taskContainer.innerHTML = '';
  taskContainer.append(fragment);
};

const createTask = array => {
  console.log(array);
  const fragment = document.createDocumentFragment();
  array.forEach(task => {
    const taskContainerDiv = document.createElement('div');
    const newTask = document.createElement('input');
    const newTaskLabel = document.createElement('label');
    const closeElement = document.createElement('span');
    taskContainerDiv.classList.add('task');
    closeElement.textContent = 'X';
    closeElement.classList.add('close');
    newTask.id = task.id;
    newTask.type = 'checkbox';
    newTaskLabel.htmlFor = task.id;
    newTaskLabel.textContent = task.task;
    taskContainerDiv.append(newTask, newTaskLabel, closeElement);
    fragment.append(taskContainerDiv);
  });
  printTask(fragment);
};

const deleteTask = idSelected => {
  const filteredArray = taskArray.filter(object => object.id !== idSelected);
  console.log(filteredArray);
};

createTasks.addEventListener('submit', e => {
  e.preventDefault();
  createObject(e.target.task.value);
  e.target.task.value = '';
});

taskContainer.addEventListener('click', e => {
  if (e.target.classList.contains('close')) {
    deleteTask(Number(e.target.previousSibling.htmlFor));
  }
});
