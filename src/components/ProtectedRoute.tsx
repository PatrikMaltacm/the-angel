import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Consultando os magos...</div>;
  }

  return signed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;