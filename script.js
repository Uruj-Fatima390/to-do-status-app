// Function to add a new task
function addTask() {
    var inputBox = document.getElementById('input-box');
    var taskName = inputBox.value.trim(); // Trim any leading/trailing whitespace

    if (taskName !== '') {
        var tableBody = document.querySelector('.task-list');
        var newRow = tableBody.insertRow();
        // Add task name
        var listCell = newRow.insertCell();
        listCell.textContent = taskName;

        // Add status (Pending button)
        var statusCell = newRow.insertCell();
        var statusButton = document.createElement('button');
        statusButton.textContent = 'Pending';
        //statusButton.style.backgroundColor = 'green'; // Set button color
        // statusButton.style.color='white';
        statusButton.onclick = toggleStatus;
        statusCell.appendChild(statusButton);

        // Add close button
        var closeCell = newRow.insertCell();
        var closeButton = document.createElement('i');
        closeButton.className = 'material-icons';
        closeButton.textContent = 'delete';
        closeButton.onclick = function() {
            // Find the parent row and remove it
            var row = this.parentNode.parentNode;
            tableBody.removeChild(row);
            saveTasksToLocalStorage();
            updateContainerHeight();
            
        };
        closeCell.appendChild(closeButton);
       
        inputBox.value = ''; // Clear input box after adding task
        
        saveTasksToLocalStorage();
        updateContainerHeight();
    } else {
        alert('Please enter a task!');
    }
}

// Function to update container height dynamically based on the number of rows
function updateContainerHeight() {
    var todoList = document.querySelector('.todo-list');
    var numRows = document.querySelectorAll('.task-list tr').length;
    var newRowHeight = 30; // Height of each new row in pixels

    var newHeight = 220 + newRowHeight * numRows; // Initial height + height for each new row
    todoList.style.height = newHeight + 'px';

    // Update overall container height
    var toDoContainer = document.querySelector('.to-do');
    toDoContainer.style.height = newHeight + 190 + 'px';
}

// Function to toggle task status
function toggleStatus() {
    var button = this; // 'this' refers to the button that was clicked
    if (button.textContent === 'Pending') {
        button.textContent = 'Completed';
    } else {
        button.textContent = 'Pending';
    }
    saveTasksToLocalStorage(); // Save tasks to local storage after status change

}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    var tasks = [];

    // Iterate over table rows and store task names and statuses
    var tableRows = document.querySelectorAll('.task-list tr');
    tableRows.forEach(function(row) {
        var taskName = row.cells[0].textContent;
        var taskStatus = row.cells[1].querySelector('button').textContent;
        tasks.push({ name: taskName, status: taskStatus });
    });

    // Convert tasks array to JSON and store in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    if (tasks) {
        var tableBody = document.querySelector('.task-list');

        // Clear existing rows
        tableBody.innerHTML = '';

        // Iterate over tasks and add them to the table
        tasks.forEach(function(task) {
            var newRow = tableBody.insertRow();
            var listCell = newRow.insertCell();
            listCell.textContent = task.name;

            var statusCell = newRow.insertCell();
            var statusButton = document.createElement('button');
            statusButton.textContent = task.status;
            // statusButton.style.backgroundColor = 'green'; // Set button color to green for both statuses
            // statusButton.style.color = 'white';
            statusButton.onclick = toggleStatus;
            statusCell.appendChild(statusButton);

            var closeCell = newRow.insertCell();
            var closeButton = document.createElement('i');
            closeButton.className = 'material-icons';
            closeButton.textContent = 'delete';
            closeButton.onclick = function() {
                var row = this.parentNode.parentNode;
                row.remove(); // Use row.remove() to remove the row from the DOM
                saveTasksToLocalStorage(); // Save tasks to local storage after deletion
            };
            closeCell.appendChild(closeButton);
        });
    }
}

// Load tasks from local storage when the page loads
// window.onload = loadTasksFromLocalStorage;
loadTasksFromLocalStorage();