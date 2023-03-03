import './App.scss';
import Header from './components/view/header/header';
import Footer from './components/view/footer/footer';
import { Outlet } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './components/languages/locales';
import { translations } from './components/languages/translations';
import { LanguagesManager } from './components/languages/languagesManager';
import { AuthProvider } from './context/authContext';
import { setDefaultOptions } from 'date-fns';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  const { currentLocale, setLocale, fnsLocale } = LanguagesManager();

  setDefaultOptions({ locale: fnsLocale });

  return (
    <IntlProvider
      messages={translations[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.ENGLISH}
    >
      <AuthProvider>
        <div className="app wrapper">
          <Header currentLocale={currentLocale} setLocale={setLocale} />
          <div className="app__content">
            <Outlet />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </IntlProvider >
  );
}

export default App;
