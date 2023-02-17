import { useState } from 'react';
import { LOCALES } from './locales';
import { enUS, ru } from 'date-fns/locale';


export const LanguagesManager = () => {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());
  const setLocale = (locale: string) => {
    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
  };

  function getInitialLocal() {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || LOCALES.ENGLISH;
  }

  const fnsLocales = {
    'ru-RU': ru,
    'en-US': enUS,
  };

  const fnsLocale = fnsLocales[currentLocale as keyof typeof fnsLocales] || enUS;

  return { currentLocale, setLocale, fnsLocale };
};
