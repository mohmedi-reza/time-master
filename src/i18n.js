import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import faTranslation from "./locales/fa/translation.json";
// Import the Persian font CSS (side-effect only import)
import "./assets/webfonts/fontiran.css";

// Get stored language from localStorage or default to 'en'
const storedLanguage = localStorage.getItem("language") || "en";

// Set HTML dir attribute based on language and load appropriate font
const setHTMLDir = (lng) => {
  const dir = lng === "fa" ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  
  // Add/remove Persian font class based on language
  if (lng === "fa") {
    document.documentElement.classList.add('persian-font');
  } else {
    document.documentElement.classList.remove('persian-font');
  }
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
