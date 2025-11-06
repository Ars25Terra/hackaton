import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from './locales/de.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  ru: { translation: ru },
};

const getStoredLanguage = (): string => {
  const stored = localStorage.getItem('language');
  if (stored && ['en', 'de', 'ru'].includes(stored)) {
    return stored;
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

