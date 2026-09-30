const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const errorMessage = document.querySelector('#error-message');
const list = document.querySelector('#task-list');
 
let tasks = load();
 
function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
 
function load() {
  const raw = localStorage.getItem('tasks');
  return JSON.parse(raw) || [];
}
 
function createTaskItem(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;
 
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  li.append(checkbox);
 
  const title = document.createElement('span');
  title.textContent = task.title;
  li.append(title);
 
  if (task.done) {
    li.classList.add('done');
    checkbox.setAttribute('checked', '');
 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    li.append(deleteButton);
  }
 
  return li;
}
 
function renderTasks() {
  list.innerHTML = '';
  tasks.map(createTaskItem).forEach((li) => list.append(li));
}
 
function addTask(text) {
  if (text.trim() === '') {
    errorMessage.textContent = 'Please type a task first.';
    return;
  }
 
  errorMessage.textContent = '';
  tasks[tasks.length] = { id: `${Date.now()}`, title: text.trim(), done: false };
  input.value = '';
  save();
  renderTasks();
}
 
function toggleTask(id) {
  tasks.forEach((task) => {
    if (task.id === id) task.done = !task.done;
  });
  save();
  renderTasks();
}
 
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  save();
  renderTasks();
}
 
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(input.value);
});
 
list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
 
  if (e.target.closest('.delete')) {
    deleteTask(li.dataset.id);
  } else {
    toggleTask(li.dataset.id);
  }
});
 
renderTasks();
 




