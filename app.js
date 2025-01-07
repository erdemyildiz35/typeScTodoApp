"use strict";
// HTML Elementlerini Seçme
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const deadlineInput = document.getElementById('deadlineInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const filterSelect = document.getElementById('filterSelect');
const taskList = document.getElementById('taskList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
// Görev Listesi (localStorage'dan yüklenir)
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
// Görev Ekle
function addTask() {
    const taskDescription = taskInput.value.trim();
    const selectedCategory = categorySelect.value;
    const deadline = deadlineInput.value;
    if (taskDescription === '' || selectedCategory === '')
        return;
    const newTask = {
        id: Date.now(),
        description: taskDescription,
        completed: false,
        category: selectedCategory,
        deadline: deadline || undefined,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    deadlineInput.value = '';
}
// Görev Düzenle
window.editTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
        taskInput.value = task.description;
        categorySelect.value = task.category;
        deadlineInput.value = task.deadline || '';
        tasks = tasks.filter((t) => t.id !== id);
        saveTasks();
        renderTasks();
    }
};
// Tamamlanan Görevleri Temizle
function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    saveTasks();
    renderTasks();
}
// Görevleri Kaydet
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Görevleri Listele
function renderTasks() {
    taskList.innerHTML = '';
    const selectedFilter = filterSelect.value;
    const filteredTasks = selectedFilter === 'All'
        ? tasks
        : tasks.filter((task) => task.category === selectedFilter);
    filteredTasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'};">${task.description}</span>
      <span>(${task.category})</span>
      ${task.deadline ? `<span>📅 ${task.deadline}</span>` : ''}
      <button onclick="editTask(${task.id})">Düzenle</button>
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
// Görev Sil
window.removeTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
};
// Tamamlanan Görevleri Temizleme Butonu
clearCompletedBtn.addEventListener('click', clearCompletedTasks);
// Sayfa Yüklendiğinde Görevleri Listele
renderTasks();
// Olay Dinleyicileri
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
filterSelect.addEventListener('change', renderTasks);
