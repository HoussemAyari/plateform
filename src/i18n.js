import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Charge les traductions depuis le dossier public/locales
  .use(HttpApi)
  // Détecte la langue de l'utilisateur
  .use(LanguageDetector)
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  // Initialise i18next
  .init({
    // Langue par défaut si la détection échoue
    fallbackLng: 'fr',
    // Langues supportées par votre application
    supportedLngs: ['en', 'fr'],
    debug: false, // Mettre à true pour voir les logs de i18next dans la console
    interpolation: {
      escapeValue: false, // React échappe déjà aux valeurs
    },
    // Options pour la détection de la langue
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
  });

export default i18n;
