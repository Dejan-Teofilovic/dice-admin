import { useRoutes } from 'react-router';
import AuthGuard from '../guards/AuthGuard';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import { routes } from './routes';

export default function Routes() {
  return useRoutes([
    {
      element: <AuthGuard><DashboardLayout /></AuthGuard>,
      children: routes
    },
    {
      path: '/login',
      element: <AuthGuard><Login /></AuthGuard>
    }
  ])
}