// HTML Elementlerini Seçme
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const taskList = document.getElementById('taskList') as HTMLUListElement;

// Görev Arayüzü
interface Task {
  id: number;
  description: string;
}

// Görev Listesi
let tasks: Task[] = [];

// Görev Ekle
function addTask(): void {
  const taskDescription = taskInput.value.trim();
  if (taskDescription === '') return;

  const newTask: Task = {
    id: Date.now(),
    description: taskDescription,
  };

  tasks.push(newTask);
  renderTasks();
  taskInput.value = '';
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

// Görev Sil
(window as any).removeTask = (id: number) => {
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
