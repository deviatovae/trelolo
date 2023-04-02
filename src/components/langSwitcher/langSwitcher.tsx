import './langSwitcher.scss';
import { LOCALES } from '../languages/locales';
import { LangSwitcherProps } from '../types/langSwitcherProps';

const LangSwitcher = ({ setLocale, currentLocale }: LangSwitcherProps) => {

  return (
    <button
      className={`lang-switcher__button ${currentLocale === LOCALES.ENGLISH ? 'lang-switcher__button--active' : ''}`}
      onClick={() => setLocale(currentLocale === LOCALES.ENGLISH ? LOCALES.RUSSIAN : LOCALES.ENGLISH)}
    >
      {currentLocale === LOCALES.ENGLISH ? 'EN' : 'RU'}
    </button>
  );
};

export default LangSwitcher;
