import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

// Fetch data with pagination
const fetchMaterial = async () => {
    const response = await axiosPublic.get('/materials');
    return response.data?.data; // Axios automatically parses JSON
};

// Custom hook for fetching paginated data
const useFetchMaterial = () => {
    return useQuery(['materials'], fetchMaterial, {
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

        // Retry failed requests
        retry: 2, // Set the number of retries to 2

        // Stale time
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchMaterial;
