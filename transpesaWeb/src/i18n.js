import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // 1. Importa el detector

import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  .use(LanguageDetector) // 2. Usa el plugin detector
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es', // Idioma de respaldo si el detectado no está disponible
    interpolation: {
      escapeValue: false
    },
    // 3. Configura el detector
    detection: {
      // Orden de detección:
      // 1. localStorage (si el usuario ya eligió un idioma)
      // 2. navigator (el idioma del navegador del usuario)
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'] // Dónde guardar la elección del usuario
    }
  });

export default i18n;