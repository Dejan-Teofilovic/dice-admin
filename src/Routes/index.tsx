import { useRoutes } from 'react-router';
import { Navigate } from "react-router-dom";
import useUser from '../hooks/useUser';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { routes } from './routes';

export default function Routes() {
  const { token } = useUser()
  return useRoutes([
    {
      element: token ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: routes
    },
    {
      path: '/login',
      element: token ? <Navigate to="/waiting-list" replace /> : <Login />
    },
    {
      path: '/signup',
      element: token ? <Navigate to="/waiting-list" replace /> : <Signup />
    }
  ])
}