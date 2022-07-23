import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

interface IProps {
  children: any;
}

export default function AuthGuard({ children }: IProps) {
  const { token } = useUser();

  if (token) {
    return <>{children}</>;
  } else {
    console.log('# token => ', token);
    return <Navigate to="/" />;
  }
}