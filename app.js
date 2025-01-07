"use strict";
// HTML Elementlerini Seçme
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
// Görev Listesi
let tasks = [];
// Görev Ekle
function addTask() {
    const taskDescription = taskInput.value.trim();
    if (taskDescription === '')
        return;
    const newTask = {
        id: Date.now(),
        description: taskDescription,
    };
    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
}
// Görevleri Listele
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
      ${task.description}
      <button onclick="removeTask(${task.id})">Sil</button>
    `;
        taskList.appendChild(listItem);
    });
}
// Görev Sil
window.removeTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    renderTasks();
};
// Olay Dinleyicisi
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
