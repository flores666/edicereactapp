import type {RouteObject} from 'react-router-dom';

import {PrivateRoute} from '@/components/PrivateRoute';
import {createBrowserRouter, Navigate} from 'react-router-dom';
import {
    ConstructorPage,
    RegisterPage,
    NotFoundPage,
    LibraryPage,
    RootLayout,
    LobbyPage,
    LoginPage,
    HomePage,
} from '@/pages';
import {Characters} from "@/pages/Library/Characters.tsx";
import {Items} from "@/pages/Library/Items.tsx";
import {Maps} from "@/pages/Library/Maps.tsx";

const configureAuthRoutes = () => {
    const authRoutes: Array<RouteObject> = [
        {
            path: '/constructor',
            element: <ConstructorPage/>,
        },
    ];
    return authRoutes;
};

const authRoutes = configureAuthRoutes();

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: '/login',
                element: <LoginPage/>,
            },
            {
                path: '/register',
                element: <RegisterPage/>,
            },
            {
                path: '/lobby',
                element: <LobbyPage/>,
            },
            {
                path: '/library',
                element: <LibraryPage/>,
                children: [
                    {
                        index: true,
                        element: <Navigate to="characters" replace />
                    },
                    {
                        path: 'characters',
                        element: <Characters/>,
                    },
                    {
                        path: 'items',
                        element: <Items/>,
                    },
                    {
                        path: 'maps',
                        element: <Maps/>,
                    }
                ]
            },
            {
                element: <PrivateRoute/>,
                children: authRoutes,
            },
            {
                path: '*',
                element: <NotFoundPage/>,
            },
        ],
    },
]);
