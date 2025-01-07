"use strict";
// HTML Elementlerini Seçme
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
// Görev Listesi
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
// Görev Ekle
function addTask() {
    const taskDescription = taskInput.value.trim();
    if (taskDescription === '')
        return;
    const newTask = {
        id: Date.now(),
        description: taskDescription,
        completed: false, // Yeni görev tamamlanmamış olarak başlar
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}
// Görevleri Kaydet
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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
// Görev Tamamlanma Durumunu Değiştir
window.toggleTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
};
window.removeTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
};
// Sayfa Yüklendiğinde Görevleri Listele
renderTasks();
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
