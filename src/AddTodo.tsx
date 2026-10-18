import { useState } from "react";
import type { FormEvent } from "react";
import { useI18n } from "./i18n/LanguageContext";

// این interface مشخص می‌کنه این کامپوننت چه props هایی قبول می‌کنه.
// اگه یه جای دیگه‌ی کد فراموش کنی onAdd رو پاس بدی، TypeScript همون موقع خطا میده،
// نه اینکه بذاره تا وسط اجرا برنامه کرش کنه.
interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  // useState<string> یعنی این state همیشه باید رشته باشه.
  const [text, setText] = useState<string>("");
  const { t } = useI18n();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed === "") return; // جلوی اضافه کردن تسک خالی رو می‌گیریم
    onAdd(trimmed);
    setText("");
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.addPlaceholder}
      />
      <button type="submit">{t.addButton}</button>
    </form>
  );
}
