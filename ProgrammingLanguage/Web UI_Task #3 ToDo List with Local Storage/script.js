document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const searchInput = document.getElementById('search-input');

  // Retrieve tasks from LocalStorage
  const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];

  // Save tasks to LocalStorage
  const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

  // Render tasks to the UI
  const renderTasks = (filter = '') => {
    taskList.innerHTML = '';
    const tasks = getTasks();
    tasks.forEach((task, index) => {
      if (task.toLowerCase().includes(filter.toLowerCase())) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
          <span>${task}</span>
          <div>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      }
    });
  };

  // Add a new task
  addTaskBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
      const tasks = getTasks();
      tasks.push(task);
      saveTasks(tasks);
      taskInput.value = '';
      renderTasks(searchInput.value);
    }
  });

  // Edit a task
  window.editTask = (index) => {
    const tasks = getTasks();
    const newTask = prompt('Edit Task:', tasks[index]);
    if (newTask !== null) {
      tasks[index] = newTask;
      saveTasks(tasks);
      renderTasks(searchInput.value);
    }
  };

  // Delete a task
  window.deleteTask = (index) => {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks(searchInput.value);
  };

  // Search functionality
  searchInput.addEventListener('input', () => {
    renderTasks(searchInput.value);
  });

  // Initial render
  renderTasks();
});