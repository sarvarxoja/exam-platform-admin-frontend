import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PageLoader from 'components/loader/PageLoader';

const PublicRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/auth/check/exists');
      if (data.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isAuthenticated === null)
    return (
      <div>
        <PageLoader />
      </div>
    );

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
