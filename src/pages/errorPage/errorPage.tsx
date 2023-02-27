import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './errorPage.scss';
// import Header from '../components/view/header/header';
import { translations } from '../../components/languages/translations';
import { LOCALES } from '../../components/languages/locales';
import { LanguagesManager } from '../../components/languages/languagesManager';
import { setDefaultOptions } from 'date-fns';
import { IntlProvider } from 'react-intl';
import { AuthProvider } from '../../context/authContext';
import { ErrorPageContent } from './errorPageContent';

export default function ErrorPage() {
  const { currentLocale, setLocale, fnsLocale } = LanguagesManager();

  setDefaultOptions({ locale: fnsLocale });
  const error = useRouteError();
  console.log(error);
  if (isRouteErrorResponse(error)) {
    return (
      <IntlProvider
        messages={translations[currentLocale]}
        locale={currentLocale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <AuthProvider>
          <ErrorPageContent setLocale={setLocale} currentLocale={currentLocale} />
        </AuthProvider>
      </IntlProvider>
    );
  } else {
    return <div>Internal error</div>;
  }
}
