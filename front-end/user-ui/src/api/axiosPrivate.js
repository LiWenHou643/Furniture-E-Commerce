// api/axiosInstance.js
import axios from 'axios';
import axiosPublic from './axiosPublic';

const logout = async () => {
    await axiosPublic.get('/auth/logout');

    console.log('User logged out');

    localStorage.removeItem('jwt');
    window.location.href = '/login';
};

const axisoPrivate = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Required for sending cookies
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
                const response = await axiosPublic.get('/auth/refresh-token', {
                    withCredentials: true,
                });
                console.log('Access token refreshed', response.data);
                const newAccessToken = response.data.data.accessToken;
                localStorage.setItem('jwt', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axisoPrivate(originalRequest);
            } catch (refreshError) {
                // Optional: Handle refresh token failure (e.g., log out user)
                logout();
                console.error('Refresh token failed', refreshError);
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export default axisoPrivate;
