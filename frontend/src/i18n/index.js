import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from './locales/vi';
import en from './locales/en';
import ja from './locales/ja';
import ko from './locales/ko';
import zh from './locales/zh';

const saved = localStorage.getItem('anna_spa_lang') || 'vi';

i18n.use(initReactI18next).init({
  resources: { vi, en, ja, ko, zh },
  lng: saved,
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
});

export default i18n;
