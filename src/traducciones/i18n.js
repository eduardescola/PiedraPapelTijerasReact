import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traducciones
const resources = {
  en: {
    translation: {
      gameTitle: "Rock, Paper, Scissors",
      changeLanguage: "Change language",
    },
  },
  es: {
    translation: {
      gameTitle: "Piedra, Papel Tijera",
      changeLanguage: "Cambiar idioma",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es", // Idioma por defecto
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
