// زبان‌های پشتیبانی‌شده‌ی برنامه. هر زبان جدید فقط باید به این لیست و
// به آبجکت translations اضافه بشه؛ اگه یکی جا بیفته TypeScript خطا میده.
export const languages = ["fa", "en", "de"] as const;

export type Language = (typeof languages)[number];

// اسم زبان‌ها همیشه به خط خودشون نوشته می‌شه (endonym)، پس ترجمه نمی‌شن.
export const languageNames: Record<Language, string> = {
  fa: "فارسی",
  en: "English",
  de: "Deutsch",
};

export interface Dictionary {
  title: string;
  addPlaceholder: string;
  addButton: string;
  filters: {
    all: string;
    active: string;
    completed: string;
  };
  emptyAll: string;
  emptyFiltered: string;
  remaining: (remaining: number, total: number) => string;
  delete: string;
  languageLabel: string;
  // جهت متن و مقدار lang که روی <html> ست می‌شن
  dir: "rtl" | "ltr";
}

export const translations: Record<Language, Dictionary> = {
  fa: {
    title: "لیست کارها",
    addPlaceholder: "یه کار جدید بنویس...",
    addButton: "اضافه کن",
    filters: {
      all: "همه",
      active: "باقی‌مونده",
      completed: "انجام‌شده",
    },
    emptyAll: "هنوز کاری اضافه نکردی 🙂",
    emptyFiltered: "چیزی برای نمایش نیست",
    remaining: (remaining, total) => `${remaining} کار باقی‌مونده از ${total}`,
    delete: "حذف",
    languageLabel: "زبان",
    dir: "rtl",
  },
  en: {
    title: "My Tasks",
    addPlaceholder: "Write a new task...",
    addButton: "Add",
    filters: {
      all: "All",
      active: "Active",
      completed: "Completed",
    },
    emptyAll: "No tasks yet 🙂",
    emptyFiltered: "Nothing to show here",
    remaining: (remaining, total) => `${remaining} of ${total} remaining`,
    delete: "Delete",
    languageLabel: "Language",
    dir: "ltr",
  },
  de: {
    title: "Meine Aufgaben",
    addPlaceholder: "Neue Aufgabe schreiben...",
    addButton: "Hinzufügen",
    filters: {
      all: "Alle",
      active: "Offen",
      completed: "Erledigt",
    },
    emptyAll: "Noch keine Aufgaben 🙂",
    emptyFiltered: "Hier gibt es nichts anzuzeigen",
    remaining: (remaining, total) => `${remaining} von ${total} übrig`,
    delete: "Löschen",
    languageLabel: "Sprache",
    dir: "ltr",
  },
};
