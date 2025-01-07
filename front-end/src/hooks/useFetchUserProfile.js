import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance

const fetchUserProfile = async () => {
    const { data } = await axiosPrivate.get('/user');
    return data.data;
};

const useFetchCart = () => {
    return useQuery(['profile'], fetchUserProfile, {
        // Keep previous data when fetching new data
        keepPreviousData: true, // Avoid loading state when changing pages

        // Refetch data on window focus
        refetchOnWindowFocus: false, // Avoid refetching data on window focus

        // Refetch data on network reconnect
        refetchOnReconnect: false, // Avoid refetching data on network reconnect

        // Refetch data on interval
        refetchInterval: false, // Avoid refetching data on interval

        // Stale time
        staleTime: 30000, // Set the stale time to 30 seconds

        // Retry failed requests
        retry: 1, // Set the number of retries to 2
    });
};

export default useFetchCart;
