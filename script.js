// Global variables
let tasks = []; // Array of task objects: {id, subject, day, startTime, endTime, completed}
let currentView = 'daily'; // 'daily' or 'weekly'
let editingTaskId = null; // For edit mode

// DOM elements
const dailyBtn = document.getElementById('daily-btn');
const weeklyBtn = document.getElementById('weekly-btn');
const dailyView = document.getElementById('daily-view');
const weeklyView = document.getElementById('weekly-view');
const daySelect = document.getElementById('day-select');
const tasksList = document.getElementById('tasks-list');
const weeklyList = document.getElementById('weekly-list');
const addTaskBtn = document.getElementById('add-task-btn');
const taskForm = document.getElementById('task-form');
const formTitle = document.getElementById('form-title');
const taskFormElement = document.getElementById('task-form-element');
const cancelBtn = document.getElementById('cancel-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

// Load tasks from LocalStorage on page load
function loadTasks() {
    const stored = localStorage.getItem('studyPlannerTasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

// Save tasks to LocalStorage
function saveTasks() {
    localStorage.setItem('studyPlannerTasks', JSON.stringify(tasks));
}

// Render tasks based on current view
function renderTasks() {
    if (currentView === 'daily') {
        const selectedDay = daySelect.value;
        const dayTasks = tasks.filter(task => task.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime));
        renderTaskList(dayTasks, tasksList);
    } else {
        // Weekly: Group by day
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        weeklyList.innerHTML = '';
        days.forEach(day => {
            const dayTasks = tasks.filter(task => task.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
            if (dayTasks.length > 0) {
                const dayDiv = document.createElement('div');
                dayDiv.innerHTML = `<h3>${day.charAt(0).toUpperCase() + day.slice(1)}</h3>`;
                renderTaskList(dayTasks, dayDiv);
                weeklyList.appendChild(dayDiv);
            }
        });
    }
    updateProgress();
}

// Helper to render a list of tasks into a container
function renderTaskList(taskArray, container) {
    container.innerHTML = '';
    taskArray.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'completed' : ''}`;
        card.dataset.id = task.id;
        card.innerHTML = `
            <div class="task-info">
                <h3>${task.subject}</h3
