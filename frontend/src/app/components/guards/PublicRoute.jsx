import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authState } from '../../store/slices/authSlice';

const PublicRoute = ({ children }) => {
    const isAuthenticated = useSelector(authState)?.isLoggedIn;

    return isAuthenticated ? <Navigate to="/user/myurls" /> : <>{children}</>;
};

export default PublicRoute;
