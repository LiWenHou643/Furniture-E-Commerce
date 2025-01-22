import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
const login = async ({ username, password, persistent }) => {
    console.log('Logging in with:', { username, password, persistent });
    const response = await axiosPublic.post('/auth/login', {
        username,
        password,
        persistent,
    });
    return response.data;
};

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('jwt', data?.data?.accessToken);
            // Optionally, you can trigger additional logic after login success
            console.log('Login successful', data?.data);
            navigate('/'); // Redirect to homepage
        },
        onError: (error) => {
            // Handle login failure
            console.error('Login failed', error);
        },
    });
};
