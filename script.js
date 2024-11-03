let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = new Date().toISOString().split('T')[0];

function showTasksView() {
    document.getElementById('calendar').classList.add('hidden');
    document.getElementById('tasks').classList.remove('hidden');
}

function showCalendar() {
    document.getElementById('tasks').classList.add('hidden');
    document.getElementById('calendar').classList.remove('hidden');
}

document.getElementById('selectedDate').innerText = selectedDate;

function renderCalendar() {
    const monthYearDisplay = document.getElementById('monthYearDisplay');
    const daysContainer = document.getElementById('days');
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYearDisplay.innerText = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
    daysContainer.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerText = i;
        dayElement.onclick = () => selectDate(i);
        daysContainer.appendChild(dayElement);
    }
}

function selectDate(day) {
    selectedDate = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    document.getElementById('selectedDate').innerText = selectedDate;
    fetchTasks();
    showTasksView();
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function fetchTasks() {
    fetch(`api.php?action=getTasks&date=${selectedDate}`)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; 

            if (data.tasks && data.tasks.length > 0) {
                data.tasks.forEach(task => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><input type="text" value="${task.task_text}" onchange="updateTask(${task.id}, this.value, '${task.status}')"></td>
                        <td>
                            <select onchange="updateTask(${task.id}, '${task.task_text}', this.value)">
                                <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </td>
                        <td><button onclick="deleteTask(${task.id})">Delete</button></td>
                    `;
                    taskList.appendChild(row);
                });
            } else {
                taskList.innerHTML = '<tr><td colspan="3">No tasks for this date</td></tr>';
            }

            updateProgressBar(data.tasks); 
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function updateProgressBar(tasks) {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${completionPercentage}%`;
}


function updateProgressBar(tasks) {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${completionPercentage}%`;
}

function addTask() {
    const taskText = document.getElementById('newTask').value.trim();
    if (!taskText) {
        alert("Please enter a task.");
        return;
    }

    fetch('api.php?action=addTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `date=${encodeURIComponent(selectedDate)}&task=${encodeURIComponent(taskText)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log('Add Task Response:', data); 
        if (data.status === 'success') {
            document.getElementById('newTask').value = ''; 
            fetchTasks(); 
        } else {
            alert('Failed to add task: ' + (data.message || 'Unknown error'));
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateTask(id, taskText, status) {
    fetch('api.php?action=updateTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}&task=${encodeURIComponent(taskText)}&status=${status}`
    }).then(() => fetchTasks());
}

function deleteTask(id) {
    fetch('api.php?action=deleteTask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${id}`
    }).then(() => fetchTasks());
}

renderCalendar();
