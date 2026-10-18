import { createContext, useContext } from "react";
import type { Dictionary, Language } from "./translations";

// این context هم زبان فعلی رو نگه می‌داره، هم دیکشنری همون زبان رو.
// کامپوننت‌ها دیگه هیچ متن سختی (hardcoded) توی JSX ندارن.
export interface I18nValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (value === null) {
    throw new Error("useI18n باید داخل <LanguageProvider> استفاده بشه");
  }
  return value;
}
