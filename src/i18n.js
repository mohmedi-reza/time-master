import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import faTranslation from "./locales/fa/translation.json";

// Get stored language from localStorage or default to 'en'
const storedLanguage = localStorage.getItem("language") || "en";

// Set HTML dir attribute based on language
const setHTMLDir = (lng) => {
  const dir = lng === "fa" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
};

// Initialize with stored language
setHTMLDir(storedLanguage);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fa: {
      translation: faTranslation,
    },
  },
  lng: storedLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Listen for language changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
  setHTMLDir(lng);
});

export default i18n;
