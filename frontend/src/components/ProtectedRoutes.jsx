import { Navigate, Outlet } from 'react-router-dom';
import { getRole, getToken } from '../utils/authUtils';

const ProtectedRoutes = ({ allowedRoles }) => {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoutes;