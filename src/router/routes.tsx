import App from '../App';
import ErrorPage from '../pages/errorPage';
import { Boards } from '../pages/boards';

export const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/boards',
                element: <Boards/>
            }
        ]
    }
];
