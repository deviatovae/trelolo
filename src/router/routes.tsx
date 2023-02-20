import App from '../App';
import ErrorPage from '../pages/errorPage';
import { Auth } from '../pages/auth/auth';
import { Welcome } from '../pages/welcome/welcome';
import { Main } from '../pages/main/main';
import { MembersPage } from '../pages/membersPage/membersPage';
import { AuthRoute } from '../components/authRoute/authRoute';
import { ProjectPage } from '../pages/projectPage/projectPage';
import { ProfilePage } from '../pages/profilePage/profilePage';

export enum Route {
    WELCOME = '/',
    LOGIN = '/login',
    MAIN = '/main',
    MEMBERS = '/members',
    PROJECT = '/project/:id',
    PROFILE = '/profile',
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
                    },
                    {
                        path: Route.PROJECT,
                        element: <ProjectPage />
                    },
                    {
                        path: Route.PROFILE,
                        element: <ProfilePage />
                    }
                ]
            },

        ]
    }
];
