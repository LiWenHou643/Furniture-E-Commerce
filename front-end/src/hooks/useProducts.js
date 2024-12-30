// hooks/useProducts.js
import { useQuery } from 'react-query';
import axiosInstance from '../api/axiosInstance';

// Fetch products with pagination
const fetchProducts = async ({ queryKey }) => {
    const [_key, { page, size }] = queryKey;
    const response = await axiosInstance.get('/products', {
        params: { page, size }, // Pass page and size as query params
    });
    return response.data?.data; // Axios automatically parses JSON
};

// Custom hook for fetching paginated products
const useProducts = ({ page, size }) => {
    return useQuery(['products', { page, size }], fetchProducts, {
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

export default useProducts;
