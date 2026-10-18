import { useI18n } from "./i18n/LanguageContext";
import { languageNames, languages } from "./i18n/translations";

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="language-switcher" role="group" aria-label={t.languageLabel}>
      {languages.map((code) => {
        const isActive = code === language;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            className={isActive ? "active" : ""}
            aria-pressed={isActive}
            onClick={() => setLanguage(code)}
          >
            {languageNames[code]}
          </button>
        );
      })}
    </div>
  );
}
