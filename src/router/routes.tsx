import App from '../App';
import ErrorPage from '../pages/errorPage';
import { Welcome } from '../pages/welcome/welcome';

export const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Welcome />
            },
        ]
    }
];
