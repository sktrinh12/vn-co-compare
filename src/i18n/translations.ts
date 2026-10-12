import type { LocalizedText } from "../components/images";

export type Language = "en" | "es" | "vi";

export interface UiStrings {
  languageLabel: string;
  topics: string;
  about: string;
  aboutText: string;
  comparison: string;
  comparisons: string;
  noDescription: string;
  close: string;
  previous: string;
  next: string;
  showDescriptions: string;
  hideDescriptions: string;
  loading: string;
}

export const uiStrings: Record<Language, UiStrings> = {
  en: {
    languageLabel: "Language",
    topics: "Topics",
    about: "About",
    aboutText:
      "Comparison of Vietnam and Colombia from streets to food and culture.",
    comparison: "1 comparison",
    comparisons: "{count} comparisons",
    noDescription: "No description",
    close: "Close",
    previous: "Previous",
    next: "Next",
    showDescriptions: "Show descriptions",
    hideDescriptions: "Hide descriptions",
    loading: "Loading...",
  },
  es: {
    languageLabel: "Idioma",
    topics: "Temas",
    about: "Acerca de",
    aboutText:
      "Comparación de Vietnam y Colombia: desde las calles hasta la comida y la cultura.",
    comparison: "1 comparación",
    comparisons: "{count} comparaciones",
    noDescription: "Sin descripción",
    close: "Cerrar",
    previous: "Anterior",
    next: "Siguiente",
    showDescriptions: "Mostrar descripciones",
    hideDescriptions: "Ocultar descripciones",
    loading: "Cargando...",
  },
  vi: {
    languageLabel: "Ngôn ngữ",
    topics: "Chủ đề",
    about: "Giới thiệu",
    aboutText:
      "So sánh Việt Nam và Colombia: từ đường phố đến ẩm thực và văn hóa.",
    comparison: "1 so sánh",
    comparisons: "{count} so sánh",
    noDescription: "Chưa có mô tả",
    close: "Đóng",
    previous: "Trước",
    next: "Tiếp theo",
    showDescriptions: "Hiện mô tả",
    hideDescriptions: "Ẩn mô tả",
    loading: "Đang tải...",
  },
};

export const categoryStrings: Record<string, Record<Language, string>> = {
  "teleranas de cable": {
    es: "Teleranas de cable",
    en: "Cable Cobwebs",
    vi: "Mạng nhện dây điện",
  },
  Transporte: {
    es: "Transporte",
    en: "Transport",
    vi: "Giao thông",
  },
  Comida: {
    es: "Comida",
    en: "Food",
    vi: "Ẩm thực",
  },
  Indigenas: {
    es: "Indígenas",
    en: "Indigenous Peoples",
    vi: "Người bản địa",
  },
  Naturaleza: {
    es: "Naturaleza",
    en: "Nature",
    vi: "Thiên nhiên",
  },
  "Integracion de la naturaleza entre estructuras artificiales": {
    es: "Integración de la naturaleza entre estructuras artificiales",
    en: "Nature Among Man-Made Structures",
    vi: "Thiên nhiên giữa các công trình nhân tạo",
  },
};

export const translateCategory = (category: string, language: Language): string =>
  categoryStrings[category]?.[language] ?? category;

export const pickLocalized = (
  text: LocalizedText,
  language: Language
): string => text[language] || text.es;
