import './App.scss';
import Header from './components/view/header/header';
import Footer from './components/view/footer/footer';
import { Outlet } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './components/languages/locales';
import { messages } from './components/languages/messages';
import { LanguagesManager } from './components/languages/languagesManager';

function App() {
  const { currentLocale, setLocale } = LanguagesManager();

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.ENGLISH}
      >
      <div className="app wrapper">
      <Header currentLocale={currentLocale} setLocale={setLocale} />
      <div className="app__content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </IntlProvider>
  );
}

export default App;
