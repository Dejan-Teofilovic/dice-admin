import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';

interface IProps {
  children: any;
}

export default function AuthGuard({ children }: IProps) {
  const { token } = useUser();
  const { pathname } = useLocation();
  
  if (token) {
    if(pathname === '/login') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  } else {
    console.log('# token => ', token);
    return <Navigate to="/login" replace />;
  }
}