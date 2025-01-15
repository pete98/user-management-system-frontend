// src/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('token'); // Check token in sessionStorage
    return token ? children : <Navigate to="/LoginPage" />;
};

export default ProtectedRoute;
