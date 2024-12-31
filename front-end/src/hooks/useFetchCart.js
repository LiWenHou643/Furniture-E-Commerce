import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance'; // The Axios instance

const fetchCart = async () => {
    const { data } = await axiosInstance.get('/carts');
    return data.data;
};

const useFetchCart = () => {
    return useQuery(['cart'], fetchCart, {
        // Keep previous data when fetching new data
        keepPreviousData: true, // Avoid loading state when changing pages

        // Refetch data on window focus
        refetchOnWindowFocus: false, // Avoid refetching data on window focus

        // Refetch data on network reconnect
        refetchOnReconnect: false, // Avoid refetching data on network reconnect

        // Refetch data on interval
        refetchInterval: false, // Avoid refetching data on interval

        // Refetch data on mount
        refetchOnMount: false, // Avoid refetching data on mount

        // Stale time
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchCart;
