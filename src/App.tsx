import { useState } from "react";
import type { Todo, FilterType } from "./types";
import { AddTodo } from "./AddTodo";
import { TodoList } from "./TodoList";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "./i18n/LanguageContext";
import "./App.css";

// ترتیب دکمه‌های فیلتر؛ کلیدشون همون کلیدهای دیکشنری ترجمه‌ست
// (all / active / completed)، پس متن دکمه‌ها خودکار ترجمه می‌شه.
const filters: FilterType[] = ["all", "active", "completed"];

function App() {
  // useState<Todo[]> یعنی: این state همیشه یه آرایه از آبجکت‌های Todo هست.
  // اگه اشتباهی چیز دیگه‌ای (مثلاً یه رشته) بذاری توش، TypeScript موقع نوشتن کد خطا میده.
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const { t } = useI18n();

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

  const remaining = todos.filter((todo) => !todo.completed).length;
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="app-header">
        <h1>{t.title}</h1>
        <LanguageSwitcher />
      </div>
      <AddTodo onAdd={handleAdd} />
      <div className="filters">
        {filters.map((key) => (
          <button
            key={key}
            type="button"
            className={filter === key ? "active" : ""}
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
          >
            {t.filters[key]}
          </button>
        ))}
      </div>
      <TodoList
        todos={filteredTodos}
        hasTodos={todos.length > 0}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
      {todos.length > 0 && (
        <p className="footer">{t.remaining(remaining, todos.length)}</p>
      )}
    </div>
  );
}

export default App;
