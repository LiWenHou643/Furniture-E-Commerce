import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';
const fetchOrders = async ({ page, size, status }) => {
    const { data } = await axiosPrivate.get('/orders/management', {
        params: {
            page,
            size,
            status,
        },
    });
    return data.data;
};

const useFetchOrders = ({ page = 0, size = 10, status = 'pending' }) => {
    return useQuery(
        [
            'orders',
            {
                page,
                size,
                status,
            },
        ],
        () => fetchOrders({ page, size, status }),
        {
            keepPreviousData: true, // Avoid loading state when changing pages
            refetchOnWindowFocus: false, // Avoid refetching data on window focus
            refetchOnReconnect: false, // Avoid refetching data on network reconnect
            refetchInterval: false, // Avoid refetching data on interval
            staleTime: 30000, // Set the stale time to 30 seconds
            retry: 1, // Set the number of retries to 2
        }
    );
};

export default useFetchOrders;
