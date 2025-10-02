// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode; 
}

export default function ProtectedRoute({ children }: Props) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
