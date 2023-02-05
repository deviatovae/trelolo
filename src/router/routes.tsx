import App from '../App';
import ErrorPage from '../pages/errorPage';
import { Auth } from '../pages/auth/auth';
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
            {
                path: '/login',
                element: <Auth />
            },
        ]
    }
];
