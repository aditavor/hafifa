import { Navigate, Outlet } from "react-router-dom";
import { userId } from "./../Utils/systemUtils";

const ProtectedRoute = () => {
  const isAuthenticated = !!userId();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
