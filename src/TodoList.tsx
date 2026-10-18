import type { Todo } from "./types";
import { TodoItem } from "./TodoItem";
import { useI18n } from "./i18n/LanguageContext";

interface TodoListProps {
  todos: Todo[]; // آرایه‌ای از Todo، نه چیز دیگه‌ای
  // وقتی فیلتر فعاله و هیچ‌کاری باهاش جور نیست، لیست خالیه ولی کاربر
  // تسک داشته؛ پیام خالی بودن باید فرق کنه.
  hasTodos: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, hasTodos, onToggle, onDelete }: TodoListProps) {
  const { t } = useI18n();

  if (todos.length === 0) {
    return (
      <p className="empty-state">{hasTodos ? t.emptyFiltered : t.emptyAll}</p>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
