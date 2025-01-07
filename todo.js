// todo.ts
export class TodoList {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }
    addTask(description) {
        this.tasks.push({ id: this.nextId++, description, completed: false });
        console.log("Görev başarıyla eklendi!");
    }
    listTasks() {
        console.log("\n📋 Görev Listesi:");
        this.tasks.forEach((task) => {
            console.log(`${task.id}. [${task.completed ? "✔" : " "}] ${task.description}`);
        });
    }
    completeTask(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.completed = true;
            console.log("✅ Görev tamamlandı!");
        }
        else {
            console.log("❌ Görev bulunamadı!");
        }
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        console.log("🗑️ Görev silindi!");
    }
}
