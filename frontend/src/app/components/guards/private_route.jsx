import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const logged_in = useSelector(state => state.auth.isLoggedIn);

    return logged_in ? <>{children}</> : <Navigate to="/user/login" />;
}

export default PrivateRoute;
