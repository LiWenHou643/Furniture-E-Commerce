import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

import { useQuery } from '@tanstack/react-query';

const fetchAllChats = async () => {
    const { data } = await axiosPrivate.get(`/admin/messages`);
    return data.data;
};

const useFetchAllChats = () => {
    return useQuery(
        ['chats'], // Unique query key
        fetchAllChats, // Fetch function
        {
            keepPreviousData: true, // Avoid loading state when changing pages
            retry: 1, // Retry up to 1 times before failing
            refetchOnWindowFocus: false, // Avoid refetching data on window focus
            refetchOnReconnect: false, // Avoid refetching data on network reconnect
            refetchInterval: false, // Avoid refetching data on interval
            staleTime: 30000, // Set the stale time to 30 seconds
            onError: (error) => {
                toast.error(
                    error.response?.data?.message || 'An error occurred'
                );
            },
        }
    );
};

export default useFetchAllChats;
