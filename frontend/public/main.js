// Task Management

// Sample task list
let tasks = [];

// Function to add a new task
function addTask(taskTitle) {
  if (taskTitle.trim() === '') {
    return;
  }
  const newTask = {
    id: Date.now(),  // Unique ID based on timestamp
    title: taskTitle,
    completed: false
  };
  tasks.push(newTask);
  renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Render tasks to the DOM
function renderTasks() {
  const taskListContainer = document.getElementById('task-list');
  taskListContainer.innerHTML = '';  // Clear current list

  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item', 'p-2', 'border', 'border-slate-600', 'mb-2', 'rounded-lg');

    const taskText = document.createElement('span');
    taskText.textContent = task.title;
    taskText.classList.add(task.completed ? 'line-through' : '');
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('bg-red-500', 'text-white', 'rounded', 'px-2', 'ml-4');
    deleteButton.onclick = () => deleteTask(task.id);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
    toggleButton.classList.add('bg-green-500', 'text-white', 'rounded', 'px-2', 'ml-2');
    toggleButton.onclick = () => toggleTaskCompletion(task.id);

    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(toggleButton);

    taskListContainer.appendChild(taskItem);
  });
}

// Event listener for adding a new task
const addTaskButton = document.getElementById('add-task-button');
const taskInput = document.getElementById('new-task-input');
addTaskButton.addEventListener('click', () => {
  const taskTitle = taskInput.value.trim();
  addTask(taskTitle);
  taskInput.value = '';  // Clear input field
});

// Event listener for Enter key to add task
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const taskTitle = taskInput.value.trim();
    addTask(taskTitle);
    taskInput.value = '';  // Clear input field
  }
});

// Initialize with an empty task list
renderTasks();
