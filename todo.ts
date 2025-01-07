// todo.ts

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

export class TodoList {
  private tasks: Task[] = [];
  private nextId: number = 1;

  addTask(description: string): void {
    this.tasks.push({ id: this.nextId++, description, completed: false });
    console.log("Görev başarıyla eklendi!");
  }

  listTasks(): void {
    console.log("\n📋 Görev Listesi:");
    this.tasks.forEach((task) => {
      console.log(
        `${task.id}. [${task.completed ? "✔" : " "}] ${task.description}`
      );
    });
  }

  completeTask(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = true;
      console.log("✅ Görev tamamlandı!");
    } else {
      console.log("❌ Görev bulunamadı!");
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log("🗑️ Görev silindi!");
  }
}
