import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance'; // The Axios instance

const fetchCart = async () => {
    const { data } = await axiosInstance.get('/carts');
    return data.data;
};

const useFetchCart = () => {
    return useQuery(['cart'], fetchCart, {
        retry: false, // Optionally disable retries if desired
        onError: (error) => {
            console.error('Failed to fetch user profile:', error);
        },
    });
};

export default useFetchCart;
