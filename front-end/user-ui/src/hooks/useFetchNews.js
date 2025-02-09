import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

const fetchNews = async () => {
    const { data } = await axiosPublic.get('/news');
    return data.data;
};

const useFetchNews = () => {
    return useQuery(['news'], fetchNews, {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchNews;
