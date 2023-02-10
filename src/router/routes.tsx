import App from '../App';
import ErrorPage from '../pages/errorPage';
import { Auth } from '../pages/auth/auth';
import { Welcome } from '../pages/welcome/welcome';
import { Main } from '../pages/main/main';
import { MembersPage } from '../pages/membersPage/membersPage';
import { AuthRoute } from '../components/authRoute/authRoute';

export enum Route {
    WELCOME = '/',
    LOGIN = '/login',
    MAIN = '/main',
    MEMBERS = '/members',
}
export const routes = [
    {
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: Route.WELCOME,
                element: <Welcome />
            },
            {
                path: Route.LOGIN,
                element: <Auth />
            },
            {
                element: <AuthRoute/>,
                children: [
                    {
                        path: Route.MAIN,
                        element: <Main/>
                    },
                    {
                        path: Route.MEMBERS,
                        element: <MembersPage/>
                    }
                ]
            },

        ]
    }
];
