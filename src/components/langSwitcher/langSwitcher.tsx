import React, { ChangeEvent } from 'react';
import './langSwitcher.scss';
import { LOCALES } from '../../../src/components/languagesComponents/locales';
import { LangSwitcherProps } from '../types/LangSwitcherProps';

const LangSwitcher = (props: LangSwitcherProps) => {

const handleLocaleChange = (locale: string) => {
  props.handleChange({
  target: {
   value: locale,
  },
} as ChangeEvent<HTMLSelectElement>);
};

return (
  <div className="lang-switcher">
    <button
      className={`lang-switcher__button ${props.currentLocale === LOCALES.ENGLISH ? 'lang-switcher__button--active' : ''}`}
      onClick={() => handleLocaleChange(props.currentLocale === LOCALES.ENGLISH ? LOCALES.RUSSIAN : LOCALES.ENGLISH)}
      > 
      {props.currentLocale === LOCALES.ENGLISH ? 'EN' : 'RU'}
    </button>
  </div>
);
};

export default LangSwitcher;