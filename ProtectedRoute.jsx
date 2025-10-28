import { useAuth } from "@clerk/clerk-react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <div>Loading...</div>; // Optional loading state
  }

  if (!isSignedIn) {
    // Redirect to sign-in, but remember the current location
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};




