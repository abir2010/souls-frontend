import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const ProtectedRoute = () => {
  // Get the authentication status from the auth store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // If not logged in, redirect to login page and replace the history stack
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // If they are authenticated, render the child routes (like AdminLayout)
  return <Outlet />;
};

export default ProtectedRoute;
