// api/axiosInstance.js
import axios from 'axios';
import axiosPublic from './axiosPublic';

const logout = async () => {
    await axiosPublic.get('/auth/logout', {}, { withCredentials: true });

    console.log('User logged out');

    localStorage.removeItem('jwt');
    window.location.href = '/login';
};

const axisoPrivate = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

axisoPrivate.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('jwt');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axisoPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axiosPublic.get(
                    '/auth/refresh-token',
                    {},
                    {
                        withCredentials: true, // Required for sending cookies
                    }
                );
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axisoPrivate(originalRequest);
            } catch (refreshError) {
                // Optional: Handle refresh token failure (e.g., log out user)
                logout();
                console.error('Refresh token failed', refreshError);
                throw refreshError;
            }
        }
        logout();

        return Promise.reject(error);
    }
);

export default axisoPrivate;
