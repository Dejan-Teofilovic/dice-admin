import { Navigate, useLocation } from 'react-router-dom';
import { LOCALSTORAGE_TOKEN_NAME } from '../utils/constants';
import { getItemOfLocalStorage } from '../utils/functions';

interface IProps {
  children: any;
}

const token = getItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME);

export default function AuthGuard({ children }: IProps) {
  const { pathname } = useLocation();

  if (token) {
    if (pathname === '/login') {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  } else {
    console.log('# token => ', token);
    return <Navigate to="/login" replace />;
  }
}