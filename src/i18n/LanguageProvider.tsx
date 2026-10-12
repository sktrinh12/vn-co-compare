import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "./translations";
import { LanguageContext, DEFAULT_LANGUAGE } from "./LanguageContext";

const STORAGE_KEY = "vn-co-language";

const readStoredLanguage = (): Language => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "es" || stored === "vi") {
    return stored;
  }
  return DEFAULT_LANGUAGE;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
