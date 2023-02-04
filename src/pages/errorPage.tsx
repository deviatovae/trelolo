import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './errorPage.scss';
// import Header from '../components/view/header/header';
import Footer from '../components/view/footer/footer';

export default function ErrorPage() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
          <div className="app wrapper">
            {/* <Header /> */}

            <div className="app__content">
              <div className="error-page__content">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                  <i>{error.statusText || error.data?.message}</i>
                </p>
              </div>
            </div>
            <Footer />
          </div>
        );
    } else {
        return <div>Oops</div>;
    }
}
