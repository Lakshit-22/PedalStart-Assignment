// Custom JavaScript for handling tasks

// Sample data (can be replaced with actual backend integration)
let tasks = [];

// Function to display tasks in the task list
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear current list

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('card', 'mb-2');
        taskItem.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${task.title}</h5>
                <p class="card-text">${task.description}</p>
                <button class="btn btn-primary btn-sm mr-2 view-task-btn" data-toggle="modal" data-target="#taskDetailsModal" data-index="${index}">View</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask(title, description, dueDate) {
    const newTask = {
        title: title,
        description: description,
        dueDate: dueDate
    };
    tasks.push(newTask);
    displayTasks();
    $('#addTaskModal').modal('hide'); // Hide the modal after adding task
}

// Event listener for submitting the add task form
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    addTask(title, description, dueDate);
    document.getElementById('addTaskForm').reset(); // Reset form fields
});

// Event listener for viewing task details
$(document).on('click', '.view-task-btn', function() {
    const index = $(this).data('index');
    const task = tasks[index];
    document.getElementById('detailsTitle').textContent = task.title;
    document.getElementById('detailsDescription').textContent = task.description;
    document.getElementById('detailsDueDate').textContent = task.dueDate;
    $('#editTaskBtn').data('index', index); // Store index for editing
    $('#deleteTaskBtn').data('index', index); // Store index for deletion
});

// Event listener for editing task
$('#editTaskBtn').click(function() {
    const index = $(this).data('index');
    // Implement editing functionality
    // Example: Open edit modal or form
});

// Event listener for deleting task
$('#deleteTaskBtn').click(function() {
    const index = $(this).data('index');
    tasks.splice(index, 1); // Remove task from array
    displayTasks(); // Update task list
    $('#taskDetailsModal').modal('hide'); // Hide modal after deletion
});

// Initialize the task list display
displayTasks();