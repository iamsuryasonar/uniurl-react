import { Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';

function PrivateRoute({ children }) {
    const logged_in = useSelector(state => state.auth.isLoggedIn)
    console.log('private', logged_in)

    return logged_in ? <>{children}</> : <Navigate to="/user/login" />;
}

export default PrivateRoute;
