import { useEffect, useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LOCALSTORAGE_TOKEN_NAME } from '../utils/constants';
import { getItemOfLocalStorage } from '../utils/functions';

interface IProps {
  children: any;
}

const token = getItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME);

export default function AuthGuard({ children }: IProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && pathname !== '/login') {
      navigate('/login')
    }
    if (token && pathname === '/login') {
      navigate('/')
    }
  }, [])

  return <>{children}</>;
}