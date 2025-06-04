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
        path: '/constructor',
        element: <ConstructorPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
