import Header from '../../components/view/header/header';
import { Message } from '../../components/languages/messages';
import Footer from '../../components/view/footer/footer';
import { useTranslate } from '../../hooks/useTranslate';

interface ErrorPageContentProps {
  currentLocale: string
  setLocale: (locale: string) => void
}

export const ErrorPageContent = ({ currentLocale, setLocale }: ErrorPageContentProps) => {
  const { trans } = useTranslate();
  return (
    <div className="app wrapper">
      <Header currentLocale={currentLocale} setLocale={setLocale} />
      <div className="app__content">
        <div className="error-page__content">
          <h1>{trans(Message.Oops)}</h1>
          <p>{trans(Message.PageNotFound)}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};
