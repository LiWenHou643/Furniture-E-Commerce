import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

// Fetch data with pagination
const fetchBrand = async () => {
    const response = await axiosPublic.get('/brands');
    return response.data?.data; // Axios automatically parses JSON
};

// Custom hook for fetching paginated data
const useFetchBrand = () => {
    return useQuery(['brands'], fetchBrand, {
        // Keep previous data when fetching new data
        keepPreviousData: true, // Avoid loading state when changing pages

        // Refetch data on window focus
        refetchOnWindowFocus: false, // Avoid refetching data on window focus

        // Refetch data on network reconnect
        refetchOnReconnect: false, // Avoid refetching data on network reconnect

        // Refetch data on interval
        refetchInterval: false, // Avoid refetching data on interval

        // Retry failed requests
        retry: 1, // Set the number of retries to 2

        // Stale time
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchBrand;
