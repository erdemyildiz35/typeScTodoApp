// Görev Arayüzü
interface Task {
  id: number;
  description: string;
  completed: boolean;
  category: string;
  deadline?: string; // Son tarih özelliği eklendi
}

// HTML Elementlerini Seçme
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const categorySelect = document.getElementById('categorySelect') as HTMLSelectElement;
const deadlineInput = document.getElementById('deadlineInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const filterSelect = document.getElementById('filterSelect') as HTMLSelectElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;
const clearCompletedBtn = document.getElementById('clearCompletedBtn') as HTMLButtonElement;

// Görev Listesi (localStorage'dan yüklenir)
let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

// Görev Ekle
function addTask(): void {
  const taskDescription = taskInput.value.trim();
  const selectedCategory = categorySelect.value;
  const deadline = deadlineInput.value;

  if (taskDescription === '' || selectedCategory === '') return;

  const newTask: Task = {
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
(window as any).editTask = (id: number) => {
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
function clearCompletedTasks(): void {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
}

// Görevleri Kaydet
function saveTasks(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Görevleri Listele
function renderTasks(): void {
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
(window as any).toggleTask = (id: number) => {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
};

// Görev Sil
(window as any).removeTask = (id: number) => {
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
