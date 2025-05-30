import { RegisterPage } from '@/pages/Authorization/RegisterPage';
import { LoginPage } from '@/pages/Authorization/LoginPage';
import { ConstructorPage } from '@/pages/ConstructorPage';
import { createBrowserRouter } from 'react-router-dom';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { LibraryPage } from '@/pages/LibraryPage';
import { RootLayout } from '@/pages/RootLayout';
import { LobbyPage } from '@/pages/LobbyPage';
import { HomePage } from '@/pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: '/',
        element: <HomePage />,
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
    ],
  },
]);
