import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

import { useInfiniteQuery } from '@tanstack/react-query';

const fetchChat = async ({
    pageParam = 0,
    senderId,
    recipientId,
    size = 10,
}) => {
    const { data } = await axiosPrivate.get(
        `/messages/${senderId}/${recipientId}`,
        {
            params: {
                page: pageParam,
                size,
            },
        }
    );
    return data;
};

const useFetchChat = (senderId, recipientId) => {
    return useInfiniteQuery(
        ['chat', senderId, recipientId], // Unique query key
        ({ pageParam = 0 }) => fetchChat({ senderId, recipientId, pageParam }), // Fetch function with pageParam
        {
            getNextPageParam: (lastPage, pages) => {
                // If there are fewer messages than the page size, we’ve reached the end
                if (lastPage.length < 10) return undefined; // No more pages to fetch
                return pages.length; // Otherwise, increase the page number for next request
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            },
        }
    );
};

export default useFetchChat;
