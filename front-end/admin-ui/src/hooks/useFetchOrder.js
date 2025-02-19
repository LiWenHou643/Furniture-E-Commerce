import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchOrder = async ({ orderId }) => {
    const { data } = await axiosPrivate.get(`/orders/${orderId}`);
    return data.data;
};

const useFetchOrder = (orderId) => {
    return useQuery(['order', orderId], () => fetchOrder({ orderId }), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchOrder;
