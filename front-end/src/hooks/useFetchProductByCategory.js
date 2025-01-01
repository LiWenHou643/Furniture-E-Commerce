// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

const fetchProductByCategory = async ({ queryKey }) => {
    const [_key, { categoryId }] = queryKey;
    const response = await axiosPublic.get(`/products/${categoryId}`);
    return response.data?.data; // Axios automatically parses JSON
};

const useFetchProductByCategory = ({ categoryId }) => {
    return useQuery(['products', { categoryId }], fetchProductByCategory, {
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

        // Retry failed requests
        retry: 2, // Set the number of retries to 2
    });
};

export default useFetchProductByCategory;
