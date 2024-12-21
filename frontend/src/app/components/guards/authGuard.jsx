import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
    const logged_in = useSelector(state => state.auth.isLoggedIn)

    return logged_in ? <Navigate to="/user/myurls" /> : <>{children}</>;
};

export default PublicRoute;
