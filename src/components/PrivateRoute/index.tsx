import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/providers/Auth';
import React from 'react';

export const PrivateRoute = ({ children }: { children?: React.ReactElement }) => {
  const { isAuthorized, isLoading } = useAuth();
  const location = useLocation();

  if (isAuthorized && !isLoading) {
    return children || <Outlet />;
  }

  return (
    <Navigate
      to="/login"
      replace={true}
      state={{
        from: location.pathname,
        search: location.search,
      }}
    />
  );
};
