// index.ts
import * as readline from 'readline-sync';
import { TodoList } from './todo';
const todoList = new TodoList();
function showMenu() {
    console.log("\n🔹 To-Do List Uygulaması");
    console.log("1. Görev Ekle");
    console.log("2. Görevleri Listele");
    console.log("3. Görevi Tamamla");
    console.log("4. Görevi Sil");
    console.log("5. Çıkış");
}
let isRunning = true;
while (isRunning) {
    showMenu();
    const choice = readline.question("Seçiminizi yapın: ");
    switch (choice) {
        case '1':
            const description = readline.question("Görev açıklaması: ");
            todoList.addTask(description);
            break;
        case '2':
            todoList.listTasks();
            break;
        case '3':
            const completeId = parseInt(readline.question("Tamamlanacak görev ID: "));
            todoList.completeTask(completeId);
            break;
        case '4':
            const deleteId = parseInt(readline.question("Silinecek görev ID: "));
            todoList.deleteTask(deleteId);
            break;
        case '5':
            console.log("👋 Uygulamadan çıkılıyor...");
            isRunning = false;
            break;
        default:
            console.log("⚠️ Geçersiz seçim, tekrar deneyin.");
    }
}
