// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const createTasks = document.getElementById('create');
const taskContainer = document.getElementById('tasksContainer');
const itemsLeft = document.getElementById('allItems');
const filters = document.getElementById('filters');
const clearCompletedElement = document.getElementById('clearCompleted');

let taskArray = [];
let uncheckedArray = [];
let checkedArray = [];

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
    newTask.checked = task.checked;
    newTaskLabel.classList.add('label');
    newTaskLabel.htmlFor = task.id;
    newTaskLabel.textContent = task.task;
    taskContainerDiv.append(newTask, newTaskLabel, closeElement);
    fragment.append(taskContainerDiv);
  });
  printTask(fragment);
};

const deleteTask = idSelected => {
  const filteredArray = taskArray.filter(object => object.id !== idSelected);
  taskArray = filteredArray;
  createTask(taskArray);
};

const setCheckOnTask = taskId => {
  taskArray.forEach(task => {
    if (task.id === Number(taskId)) task.checked = !task.checked;
  });
  createTask(taskArray);
};

const numberOfItems = array => {
  itemsLeft.textContent = `${array.length} items left`;
};

const onlyCheckedTasks = () => {
  const filteredArray = taskArray.filter(object => object.checked === false);
  uncheckedArray = filteredArray;
  createTask(uncheckedArray);
};

const onlyCheckedTasksWithoutPrint = () => {
  const filteredArray = taskArray.filter(object => object.checked === false);
  uncheckedArray = filteredArray;
  console.log(uncheckedArray);
};

const onlyUncheckedTasks = () => {
  const filteredArray = taskArray.filter(object => object.checked !== false);
  checkedArray = filteredArray;
  createTask(checkedArray);
};

const clearCompleted = () => {
  const filteredArray = taskArray.filter(object => object.checked === false);
  taskArray = filteredArray;
  createTask(taskArray);
};

createTasks.addEventListener('submit', e => {
  e.preventDefault();
  createObject(e.target.task.value);
  e.target.task.value = '';
  numberOfItems(taskArray);
});

taskContainer.addEventListener('click', e => {
  if (e.target.classList.contains('close')) {
    deleteTask(
      Number(e.target.previousSibling.htmlFor),
      e.target.parentElement,
      taskArray
    );
  } else if ((e.target.type = 'checkbox')) {
    setCheckOnTask(e.target.id);
    onlyCheckedTasksWithoutPrint();
    numberOfItems(uncheckedArray);
  }
});

filters.addEventListener('click', e => {
  if (e.target.id === 'filterActive') {
    filters.children[0].classList.remove('active-filter');
    filters.children[1].classList.add('active-filter');
    filters.children[2].classList.remove('active-filter');
    onlyCheckedTasks();
    numberOfItems(uncheckedArray);
  } else if (e.target.id === 'filterAll') {
    filters.children[0].classList.add('active-filter');
    filters.children[1].classList.remove('active-filter');
    filters.children[2].classList.remove('active-filter');
    createTask(taskArray);
    numberOfItems(taskArray);
    onlyCheckedTasksWithoutPrint();
    numberOfItems(uncheckedArray);
  } else if (e.target.id === 'filterCompleted') {
    onlyUncheckedTasks();
    numberOfItems(checkedArray);
  }
});

clearCompletedElement.addEventListener('click', e => {
  clearCompleted();
});
