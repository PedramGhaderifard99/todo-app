import type { Todo } from "./types";
import { useI18n } from "./i18n/LanguageContext";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { t } = useI18n();

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        {t.delete}
      </button>
    </li>
  );
}
