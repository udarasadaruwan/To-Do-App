let tasks = [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // Checkbox for marking task as complete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.onchange = (event) => {
            event.stopPropagation();
            task.completed = checkbox.checked; 
            renderTasks(); 
        };

   
        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        // Set class for completed tasks
        li.className = task.completed ? 'completed' : ''; 


        li.appendChild(checkbox); 
        li.appendChild(taskText); 

        // Container for buttons 
        const buttonContainer = document.createElement('div');

        // Button for deleting the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor = 'red';
        deleteButton.onclick = (event) => {
            event.stopPropagation();
            const confirmed = confirm(`Are you sure you want to delete the task: "${task.text}"?`);
            if (confirmed) {
                tasks.splice(index, 1); 
                renderTasks(); 
            }
        };

        // Button for editing the task
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = (event) => {
            event.stopPropagation();
            const newTask = prompt('Edit task:', task.text);
            if (newTask !== null && newTask.trim() !== '') {
                task.text = newTask; 
                renderTasks();
            }
        };

        // Append buttons to the container
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        // Append the button container to the list item
        li.appendChild(buttonContainer); 

        // Append the list item to the task list
        taskList.appendChild(li);
    });
}

document.getElementById('addTaskButton').onclick = (event) => {
    const taskInput = document.getElementById('taskInput');
    const newTaskText = taskInput.value.trim();

    if (newTaskText) {
        tasks.push({ text: newTaskText, completed: false }); 
        taskInput.value = ''; 
        renderTasks(); 
    } else {
        alert('Please enter a task.'); 
    }
};
