import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get("token");

        if (token) {
            localStorage.setItem("token", token);

            // Decode token to extract user role (optional)
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload.role || payload.userRole; // match your backend claims

            const user = {
                id: payload.sub || payload.userId,
                role,
            };

            localStorage.setItem("user", JSON.stringify(user));

            // Redirect based on role
            if (role === 'ADMIN') {
                navigate('/admindashboard');
            } else if (role === 'EMPLOYEE') {
                navigate('/employeedashboard');
            } else {
                navigate('/');
            }
        } else {
            navigate('/login');
        }
    }, []);

    return <p>Completing Google Login...</p>;
};

export default OAuthRedirect;
