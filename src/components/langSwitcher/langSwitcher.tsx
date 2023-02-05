import { ChangeEvent } from 'react';
import './langSwitcher.scss';
import { LOCALES } from '../languages/locales';
import { LangSwitcherProps } from '../types/LangSwitcherProps';

const LangSwitcher = ({ handleChange, currentLocale }: LangSwitcherProps) => {

const handleLocaleChange = (locale: string) => {
  handleChange({
  target: {
   value: locale,
  },
} as ChangeEvent<HTMLSelectElement>);
};

return (
    <button
      className={`lang-switcher__button ${currentLocale === LOCALES.ENGLISH ? 'lang-switcher__button--active' : ''}`}
      onClick={() => handleLocaleChange(currentLocale === LOCALES.ENGLISH ? LOCALES.RUSSIAN : LOCALES.ENGLISH)}
      > 
      {currentLocale === LOCALES.ENGLISH ? 'EN' : 'RU'}
    </button>
  );
};

export default LangSwitcher;