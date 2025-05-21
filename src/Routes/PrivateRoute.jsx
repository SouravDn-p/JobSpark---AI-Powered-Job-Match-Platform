import useAuth from "../components/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/shared/LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <LoadingSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ form: location }} replace />;
}
