// api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    // const accessToken = localStorage.getItem('accessToken');
    const accessToken =
        'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJsdXhlaG91c2UiLCJzdWIiOiJ1c2VyMUBleGFtcGxlLmNvbSIsImV4cCI6MTczNTcyNzY4NCwiaWF0IjoxNzM1NjI3Njg0LCJ1c2VySWQiOjIsInNjb3BlIjoiUk9MRV9VU0VSIn0.Niq4WPTtxOBsNrfSZO9NcLw4UGWOS5UJ8C4RIlXREcF-5C8pr1RQk9iyvjvv7wIn1iPLvLeMJUfwVHzfFq07LSW0km2xC1JwZsLcVEw2CAWp4Hf95U0tRfA9vHKBjZsNkw_6C23b8idTM-oPJ2KC_QDAAnHCfTR_92ZEQ6PKuuTX7h4qgN5aP4RFn5lQsOWEfa8il0hEAcaY87uCXjokMLNM0b3Fc7jcqsqICR1vNQQhvYQPFQ-mGaIOS98mZTztdpgHeeFcLP0HkwKRuYd44jlj6w3udq1uOuVz6uFt6v-jSN8gFWsZFLr_aWzN043PHKRfQkpWiLOB5WCeIQsvBQ';
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axiosInstance.post(
                    '/auth/refresh-token',
                    {},
                    {
                        withCredentials: true, // Required for sending cookies
                    }
                );
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Optional: Handle refresh token failure (e.g., log out user)
                console.error('Refresh token failed', refreshError);
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
