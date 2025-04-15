// src/components/PrivateRoute.jsx
import { Navigate } from "react-router";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Token yoksa login sayfasına yönlendir
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token varsa çocuk bileşenleri göster
  return children;
}

export default PrivateRoute;