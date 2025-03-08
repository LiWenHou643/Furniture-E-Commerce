// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

// Fetch products with pagination
const fetchFetchTotalSoldProducts = async () => {
    const response = await axiosPublic.get('/products/total-sold');
    return response.data?.data; // Axios automatically parses JSON
};

// Custom hook for fetching paginated products
const useFetchTotalSoldProducts = () => {
    return useQuery(['total-sales'], fetchFetchTotalSoldProducts, {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchTotalSoldProducts;
