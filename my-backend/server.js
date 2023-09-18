const express = require('express');
const router = express.Router();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// To add a new task
app.post('/addTask', (req, res) => {
  // Logic to add a task
  res.status(201).send('Task added');
});

// To delete a task
app.delete('/deleteTask/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  // Logic to delete a task
  res.status(200).send(`Task ${taskId} deleted`);
});

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
});

app.post('/addTask', (req, res) => {
  const task = req.body.task;
  const sql = "INSERT INTO tasks (task) VALUES (?)";

  db.run(sql, [task], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(201).send({ id: this.lastID });
  });
});


app.get('/getTasks', (req, res) => {
  const sql = "SELECT * FROM tasks";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(rows);
  });
});

module.exports = router;
