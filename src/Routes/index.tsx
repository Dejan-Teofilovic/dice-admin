import { useRoutes } from 'react-router';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import { routes } from './routes';

export default function Routes() {
  return useRoutes([
    {
      element: <DashboardLayout />,
      children: routes
    },
    {
      path: '/login',
      element: <Login />
    }
  ])
}