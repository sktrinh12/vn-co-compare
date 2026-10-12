import { createContext, useContext } from "react";
import type { Language, UiStrings } from "./translations";
import { uiStrings } from "./translations";

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "vi", label: "VI" },
];

export const DEFAULT_LANGUAGE: Language = "es";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const useT = (): UiStrings => uiStrings[useLanguage().language];
