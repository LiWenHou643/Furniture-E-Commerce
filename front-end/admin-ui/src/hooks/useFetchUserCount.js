import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance

const fetchUserCount = async () => {
    const { data } = await axiosPrivate.get('/users/user-count');
    return data.data;
};

const useFetchUserCount = () => {
    return useQuery(['userCount'], fetchUserCount, {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchUserCount;
