import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { I18nContext } from "./LanguageContext";
import { languages, translations } from "./translations";
import type { Language } from "./translations";

const STORAGE_KEY = "todo-app.language";

function isLanguage(value: string | null): value is Language {
  return languages.some((language) => language === value);
}

function readStoredLanguage(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // حالت private/blocked هم باید برنامه رو خراب نکنه
    return null;
  }
}

function writeStoredLanguage(language: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // ذخیره نشد هم مهم نیست؛ فقط انتخاب کاربر یادش نمی‌مونه
  }
}

// ترتیب اولویت: انتخاب قبلی کاربر، بعد زبان مرورگر، بعد فارسی
function detectLanguage(): Language {
  const stored = readStoredLanguage();
  if (isLanguage(stored)) return stored;

  for (const candidate of navigator.languages) {
    const base = candidate.toLowerCase().split("-")[0];
    if (isLanguage(base)) return base;
  }
  // بعضی مرورگرها فقط navigator.language دارن
  const single = navigator.language.toLowerCase().split("-")[0];
  if (isLanguage(single)) return single;

  return "fa";
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(detectLanguage);

  useEffect(() => {
    const dictionary = translations[language];
    // lang و dir روی <html> می‌شن تا مرورگر و screen reader درست بفهمن
    document.documentElement.lang = language;
    document.documentElement.dir = dictionary.dir;
    document.title = dictionary.title;
    writeStoredLanguage(language);
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t: translations[language] }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
