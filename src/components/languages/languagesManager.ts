import { useState } from 'react';
import { LOCALES } from './locales';

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

  return { currentLocale, setLocale };
};
