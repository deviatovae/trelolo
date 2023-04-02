import App from '../App';
import ErrorPage from '../pages/errorPage/errorPage';
import { Auth } from '../pages/auth/auth';
import { Welcome } from '../pages/welcome/welcome';
import { Main } from '../pages/main/main';
import { MembersPage } from '../pages/membersPage/membersPage';
import { AuthRoute } from '../components/authRoute/authRoute';
import { ProjectPage } from '../pages/projectPage/projectPage';
import { MyProjectsPage } from '../pages/myProjects/myProjects';

import { ProfilePage } from '../pages/profilePage/profilePage';

export enum Route {
    WELCOME = '/',
    LOGIN = '/login',
    PROFILE = '/profile',
    MAIN = '/main',
    MEMBERS = '/members',
    PROJECTS = '/projects',
    PROJECT_BOARD = '/project/:id',
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
                        element: <Main />
                    },
                    {
                        path: Route.MEMBERS,
                        element: <MembersPage />
                    },
                    {
                        path: Route.PROJECTS,
                        element: <MyProjectsPage />
                    },
                    {
                        path: Route.PROJECT_BOARD,
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
