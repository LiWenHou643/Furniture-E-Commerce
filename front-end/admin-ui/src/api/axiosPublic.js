import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Required for sending cookies
});

export default axiosPublic;
