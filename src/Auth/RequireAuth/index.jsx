import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {

  const { token, userInf } = useSelector(state => state.user)
  const location = useLocation();

  if (token !== '' && userInf !== null) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
}


export default RequireAuth;