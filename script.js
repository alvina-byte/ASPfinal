let taskId = 0;

// Function for Kanban board tasks
function addTask(columnId, inputId) {
  const column = document.getElementById(columnId);
  const input = document.getElementById(inputId);
  const taskContent = input.value;

  if (taskContent === '') {
    alert('Task cannot be empty');
    return;
  }

  taskId++;

  const newTask = document.createElement('div');
  newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
  newTask.id = `task${taskId}`;
  newTask.draggable = true;

  const taskText = document.createElement('span');
  taskText.innerHTML = taskContent;
  newTask.appendChild(taskText);

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-outline-secondary btn-sm';
  editBtn.innerHTML = 'Edit';
  editBtn.onclick = function() {
    const newTaskText = prompt('Edit task:', taskText.innerHTML);
    if (newTaskText) {
      taskText.innerHTML = newTaskText;
    }
  };
  btnGroup.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-outline-danger btn-sm';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.onclick = function() {
    newTask.remove();
  };
  btnGroup.appendChild(deleteBtn);

  newTask.appendChild(btnGroup);

  newTask.ondragstart = function(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  };

  column.appendChild(newTask);
}

// Function for Upcoming tasks
function addUpcomingTask() {
  const column = document.getElementById('upcomingTasks');
  const input = document.getElementById('newUpcomingTask');
  const taskContent = input.value;

  if (taskContent === '') {
    alert('Task cannot be empty');
    return;
  }

  taskId++;

  const newTask = document.createElement('div');
  newTask.className = 'list-group-item d-flex justify-content-between align-items-center';
  newTask.id = `task${taskId}`;

  const taskText = document.createElement('span');
  taskText.innerHTML = taskContent;
  newTask.appendChild(taskText);

  const btnGroup = document.createElement('div');
  btnGroup.className = 'btn-group';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-outline-secondary btn-sm';
  editBtn.innerHTML = 'Edit';
  editBtn.onclick = function() {
    const newTaskText = prompt('Edit task:', taskText.innerHTML);
    if (newTaskText) {
      taskText.innerHTML = newTaskText;
    }
  };
  btnGroup.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-outline-danger btn-sm';
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.onclick = function() {
    newTask.remove();
  };
  btnGroup.appendChild(deleteBtn);

  newTask.appendChild(btnGroup);

  column.appendChild(newTask);
}

// Drag-and-drop code
document.addEventListener('DOMContentLoaded', function() {
  const columns = document.querySelectorAll('.col-md-4');

  columns.forEach(function(column) {
    column.ondragover = function(event) {
      event.preventDefault();
    };

    column.ondrop = function(event) {
      event.preventDefault();
      const taskId = event.dataTransfer.getData('text/plain');
      const task = document.getElementById(taskId);
      column.querySelector('.list-group').appendChild(task);
    };
  });
});



fetch('http://localhost:3000/')
  .then(response => response.text())
  .then(data => console.log(data));

  // Function to add a task
function addTask() {
  fetch('http://localhost:3000/addTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: 'New Task' })  // Replace 'New Task' with the actual task string
  })
  .then(response => response.json())
  .then(data => {
    // Code to update the UI
  });
}

// Function to delete a task
function deleteTask(taskId) {
  fetch(`http://localhost:3000/deleteTask/${taskId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    // Code to update the UI
  });
}

// Function to add a task
function addTask() {
  const newTask = 'Your New Task Here'; // Get the task string from your HTML input
  fetch('http://localhost:3000/addTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task: newTask })
  })
  .then(response => response.json())
  .then(data => {
    // Update the UI with the new task
  });
}

// Function to get all tasks
function getTasks() {
  fetch('http://localhost:3000/getTasks')
  .then(response => response.json())
  .then(data => {
    // Update the UI with the fetched tasks
  });
}
