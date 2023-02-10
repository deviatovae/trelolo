import './App.scss';
import Header from './components/view/header/header';
import Footer from './components/view/footer/footer';
import { Outlet } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './components/languages/locales';
import { messages } from './components/languages/messages';
import { LanguagesManager } from './components/languages/languagesManager';
import { AuthProvider } from './context/authContext';


function App() {
  const { currentLocale, setLocale } = LanguagesManager();

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.ENGLISH}
    >
      <AuthProvider >
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
