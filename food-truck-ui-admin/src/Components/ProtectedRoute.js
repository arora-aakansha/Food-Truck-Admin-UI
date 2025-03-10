import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';

function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuth();
    
    return isLoggedIn ? children : <Navigate to="/Login" replace />;
}

export default ProtectedRoute;
