// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todolist',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// ... (dalam file app.js)

app.get('/tasks', (req, res) => {
  const selectQuery = 'SELECT * FROM tasks';
  db.query(selectQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
});

// ... (dalam file app.js)

const taskForm = document.getElementById('taskForm');
const taskListContainer = document.getElementById('taskList');

function addTask() {
  const taskInput = document.getElementById('task');
  const taskValue = taskInput.value;

  fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task: taskValue }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    fetchTasks();
  })
  .catch(error => console.error('Error:', error));

  taskInput.value = '';
}

function fetchTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => displayTasks(tasks))
    .catch(error => console.error('Error:', error));
}

function displayTasks(tasks) {
  taskListContainer.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.task;
    taskListContainer.appendChild(taskItem);
  });
}

document.addEventListener('DOMContentLoaded', fetchTasks);
