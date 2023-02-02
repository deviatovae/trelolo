import App from '../App';
import ErrorPage from '../pages/errorPage';
import { Boards } from '../pages/boards';
import { Welcome } from './../pages/welcome/welcome';

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
                path: '/boards',
                element: <Boards/>
            }
        ]
    }
];
