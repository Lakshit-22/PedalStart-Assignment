// this is a backend code of javascript using crud/crux operation

//Create a new directory for your project and initialize it:

/*mkdir task-api
cd task-api
npm init -y*/

//Next, install necessary dependencies

//npm install express body-parser

/*Express: Fast, unopinionated, minimalist web framework for Node.js.
body-parser: Middleware to parse incoming request bodies in a middleware before your handlers.*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Placeholder for storing tasks (for demonstration purposes)
let tasks = [
    { id: 1, title: 'Task 1', description: 'Description of Task 1' },
    { id: 2, title: 'Task 2', description: 'Description of Task 2' }
];

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET a single task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        res.status(404).send('Task not found');
    } else {
        res.json(task);
    }
});

// POST create a new task
app.post('/tasks', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

// PUT update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    let updatedTask = req.body;
    let taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    } else {
        res.status(404).send('Task not found');
    }
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

/*Explanation
GET /tasks: Retrieves all tasks.
GET /tasks/:id: Retrieves a single task by its ID.
POST /tasks: Creates a new task.
PUT /tasks/:id: Updates an existing task identified by its ID.
DELETE /tasks/:id: Deletes a task identified by its ID*/

/*Testing the API
You can test the API using tools like Postman or curl. Here are example requests:


4. GET all tasks: GET http://localhost:3000/tasks
GET a single task: GET http://localhost:3000/tasks/1
POST create a task: POST http://localhost:3000/tasks with JSON body:*/


/*{
    "id": 3,
    "title": "New Task",
    "description": "Description of the new task"
}
*/

/*PUT update a task: PUT http://localhost:3000/tasks/3 with JSON body:*/

/*{
    "id": 3,
    "title": "Updated Task",
    "description": "Updated description of the task"
}*/