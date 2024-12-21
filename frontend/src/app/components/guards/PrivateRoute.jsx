import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authState } from '../../store/slices/authSlice';

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector(authState)?.isLoggedIn;

    return isAuthenticated ? <>{children}</> : <Navigate to="/user/login" />;
}

export default PrivateRoute;
