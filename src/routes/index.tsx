import type { RouteObject } from 'react-router-dom';

import { PrivateRoute } from '@/components/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';
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

const configureAuthRoutes = () => {
  const authRoutes: Array<RouteObject> = [
    {
      path: '/constructor',
      element: <ConstructorPage />,
    },
  ];
  return authRoutes;
};

const authRoutes = configureAuthRoutes();

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/lobby',
        element: <LobbyPage />,
      },
      {
        path: '/library',
        element: <LibraryPage />,
      },
      {
        element: <PrivateRoute />,
        children: authRoutes,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
