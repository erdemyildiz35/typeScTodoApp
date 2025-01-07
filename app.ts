// HTML Elementlerini Seçme
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

// Görev Arayüzü
interface Task {
  id: number;
  description: string;
  completed?: boolean;
}

// Görev Listesi
let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');

// Görev Ekle
function addTask(): void {
  const taskDescription = taskInput.value.trim();
  if (taskDescription === '') return;

  const newTask: Task = {
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
function saveTasks(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Görevleri Listele
function renderTasks(): void {
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
(window as any).toggleTask = (id: number) => {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
};
(window as any).removeTask = (id: number) => {
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