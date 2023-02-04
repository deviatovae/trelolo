import { useState, ChangeEvent } from 'react';
import { LOCALES } from './locales';

export const LanguagesManager = () => {
  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentLocale(e.target.value);
    localStorage.setItem('locale', e.target.value);
  };
  function getInitialLocal() {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || LOCALES.ENGLISH;
  }

  return { currentLocale, handleChange };
};