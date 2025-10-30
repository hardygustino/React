import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function RoleRoute({ allow = [], children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to="/forbidden" replace />;
  return children;
}
