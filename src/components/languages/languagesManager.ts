import { useState } from 'react';
import { LOCALES } from './locales';
import { enUS, ru } from 'date-fns/locale';
import { Locale } from '../../utils/locale';

function getInitialLocal() {
  const savedLocale = localStorage.getItem('locale');
  return savedLocale || LOCALES.ENGLISH;
}

const fnsLocales = {
  'ru-RU': ru,
  'en-US': enUS,
};

export const LanguagesManager = () => {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());
  Locale.currentLocale = currentLocale;
  const setLocale = (locale: string) => {
    setCurrentLocale(locale);
    localStorage.setItem('locale', locale);
  };

  const fnsLocale = fnsLocales[currentLocale as keyof typeof fnsLocales] || enUS;

  return { currentLocale, setLocale, fnsLocale };
};
