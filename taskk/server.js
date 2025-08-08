const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Tasks array
const tasks = [
  { id: 1, description: 'Type the word "hello"' },
  { id: 2, description: 'Type the word "world"' },
  { id: 3, description: 'Type the word "javascript"' },
  { id: 4, description: 'Type the word "nodejs"' },
  { id: 5, description: 'Type the word "coding"' },
];

// Serve frontend static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// API: Get a random task
app.get('/api/task/random', (req, res) => {
  const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  res.json(randomTask);
});

// API: Submit answer for a task
app.post('/api/task/:id/submit', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { answer } = req.body;

  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const requiredWord = task.description.toLowerCase().replace('type the word ', '').replace(/"/g, '').trim();
  if (answer && answer.toLowerCase().trim() === requiredWord) {
    return res.json({ message: 'Correct!' });
  } else {
    return res.status(400).json({ error: 'Incorrect answer' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
