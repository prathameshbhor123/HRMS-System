import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data includes a role

    if (!user) {
        return <Navigate to="/loginpage" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" />; // Create an unauthorized page or redirect
    }

    return <Component />;
};

export default ProtectedRoute;