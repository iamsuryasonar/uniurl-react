import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

import { LOCAL_STORAGE_NAME } from '../common/constants'

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem(LOCAL_STORAGE_NAME)
    return token ? <Navigate to="/user/myurls" /> : <>{children}</>;
};

export default PublicRoute;
