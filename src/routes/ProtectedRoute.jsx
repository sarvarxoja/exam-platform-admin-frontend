import axios from 'axios';
import PageLoader from 'components/loader/PageLoader';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/auth/check/exists', { withCredentials: true });
      if (data.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await refreshToken();
      } else {
        setIsAuthenticated(false);
      }
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('/auth/refresh/token');
      if (response.status === 200) {
        localStorage.setItem('token', response.data?.accessToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
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

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
