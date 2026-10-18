import { useState } from "react";
import type { Todo ,FilterType} from "./types";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";
import "./App.css";

function App() {
  // useState<Todo[]> یعنی: این state همیشه یه آرایه از آبجکت‌های Todo هست.
  // اگه اشتباهی چیز دیگه‌ای (مثلاً یه رشته) بذاری توش، TypeScript موقع نوشتن کد خطا میده.
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter,setFilter]= useState<FilterType>("all");
  function handleAdd(text: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    // به‌جای تغییر مستقیم آرایه‌ی قبلی، یه آرایه‌ی جدید می‌سازیم
    // (این یه اصل مهم توی Reactه: state رو مستقیم تغییر نده)
    setTodos((prev) => [newTodo, ...prev]);
  }

  function handleToggle(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleDelete(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  const remaining = todos.filter((t) => !t.completed).length;
  const filteredTodos = todos.filter((todo)=>{
    if (filter === "active") return !todo.completed;
    if(filter === "completed")return todo.completed;
    return true;//
  });     

  return (
    <div className="app">
      <h1>لیست کارها</h1>
      <AddTodo onAdd={handleAdd} />
      <div className="filters">
  <button
    className={filter === "all" ? "active" : ""}
    onClick={() => setFilter("all")}
  >
    همه
  </button>
  <button
    className={filter === "active" ? "active" : ""}
    onClick={() => setFilter("active")}
  >
    باقی‌مونده
  </button>
  <button
    className={filter === "completed" ? "active" : ""}
    onClick={() => setFilter("completed")}
  >
    انجام‌شده
  </button>
</div>
      <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} />
      {todos.length > 0 && (
        <p className="footer">{remaining} کار باقی‌مونده از {todos.length}</p>
      )}
    </div>
  );
}

export default App;
