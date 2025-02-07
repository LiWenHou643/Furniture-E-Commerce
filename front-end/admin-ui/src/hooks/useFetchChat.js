import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

import { useInfiniteQuery } from '@tanstack/react-query';

const fetchChat = async ({
    lastTimestamp = null,
    senderId,
    recipientId,
    size = 10,
}) => {
    const { data } = await axiosPrivate.get(
        `/messages/${senderId}/${recipientId}`,
        {
            params: {
                lastTimestamp,
                size,
            },
        }
    );

    // Add a small artificial delay
    return new Promise((resolve) => {
        setTimeout(() => resolve(data.data), 500); // 500ms delay
    });
};

const useFetchChat = (senderId, recipientId) => {
    return useInfiniteQuery(
        ['chat', senderId, recipientId], // Unique query key
        ({ pageParam = null }) =>
            fetchChat({ senderId, recipientId, lastTimestamp: pageParam }), // Fetch function
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.length < 10) return undefined; // Stop if no more messages
                return lastPage[0].timestamp; // Use last message timestamp as cursor
            },
            select: (data) => ({
                ...data,
                pages: [...data.pages].reverse(), // Reverse the order of pages
            }),
            keepPreviousData: true, // Avoid loading state when changing pages
            retry: 1, // Retry up to 1 times before failing
            refetchOnWindowFocus: false, // Avoid refetching data on window focus
            refetchOnReconnect: false, // Avoid refetching data on network reconnect
            refetchInterval: false, // Avoid refetching data on interval
            staleTime: 30000, // Set the stale time to 30 seconds
            retryDelay: (attempt) => 5000, // Wait 5 seconds before retrying
            onError: (error) => {
                toast.error(
                    error.response?.data?.message || 'An error occurred'
                );
            },
        }
    );
};

export default useFetchChat;
