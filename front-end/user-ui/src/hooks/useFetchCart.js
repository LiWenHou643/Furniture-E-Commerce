import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance
import { isAuthenticated } from '../utils/auth';
const fetchCart = async () => {
    const { data } = await axiosPrivate.get('/carts');
    return data.data;
};

const useFetchCart = () => {
    return useQuery(['cart'], fetchCart, {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        staleTime: 30000, // Set the stale time to 30 seconds
        retry: 1, // Set the number of retries to 2
        enabled: isAuthenticated(), // Enable the query if the user is authenticated
    });
};

export default useFetchCart;
