// PrivateRoute.js

import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOCAL_STORAGE_NAME } from '../common/constants'

function PrivateRoute({ children }) {
    const token = localStorage.getItem(LOCAL_STORAGE_NAME)
    return token ? <>{children}</> : <Navigate to="/user/login" />;
}

export default PrivateRoute;
