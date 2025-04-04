import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Traducciones
const resources = {
  en: {
    translation: {
      gameTitle: "Rock, Paper, Scissors",
      spanishBTN: "Spanish",
      englishBTN: "English",
      playerProfile: "Player Profile",
      usernameLabel: 'Name',
      startGame: 'Start Game',
      uploadFileLbl: 'Select File',
      useCamera: 'Use camera:',
      startCamera: 'Start Camera',
      stopCamera: 'Stop Camera',
      takePhoto: 'Take Photo',
      rock: 'Rock',
      paper: 'Paper',
      scissors: 'Scissors',
    },
  },
  es: {
    translation: {
      gameTitle: "Piedra, Papel Tijera",
      spanishBTN: "Español",
      englishBTN: "Ingles",
      playerProfile: "Perfil del Jugador",
      usernameLabel: 'Nombre',
      startGame: 'Iniciar Juego',
      uploadFileLbl: 'Seleccionar Archivo',
      useCamera: 'O usa la cámara:',
      startCamera: 'Iniciar Cámara',
      stopCamera: 'Parar Cámara',
      takePhoto: 'Tomar Foto',
      rock: 'Piedra',
      paper: 'Papel',
      scissors: 'Tijeras',
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
