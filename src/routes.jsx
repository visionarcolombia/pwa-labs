import { Navigate, useRoutes } from 'react-router-dom';
import MainLayout from './layouts/main/main';
import HomePage from './pages/home/home';
import PlayerPage from './pages/player/player';
import Categories from './pages/category/category';
import LoginPage from './pages/login/login';
import PasswordPage from './pages/password/password';
import ForgotPage from './pages/forgot/forgot';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/app',
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/app/home" />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'change-password', element: <PasswordPage /> },
        { path: 'terms', element: <></> },
        { path: 'categories/:id', element: <Categories /> },
        { path: 'player/:id', element: <PlayerPage />},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'forgot', element: <ForgotPage />},
    {
      path: '*',
      element: <Navigate to="/app/home" replace />,
    },
  ]);

  return routes;
}
