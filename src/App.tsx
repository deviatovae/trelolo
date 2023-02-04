import './App.scss';
import Header from './components/view/header/header';
import Footer from './components/view/footer/footer';
import { Outlet } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../src/components/languagesComponents/locales';
import { messages } from '../src/components/languagesComponents/messages';
import { LanguagesManager } from '../src/components/languagesComponents/languagesManager';


function App() {
  const { currentLocale, handleChange } = LanguagesManager();

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.ENGLISH}
      >
      <div className="app wrapper">
      <Header currentLocale={currentLocale} handleChange={handleChange} />
      <div className="app__content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </IntlProvider>
  );
}

export default App;
