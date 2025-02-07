import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchOrders = async (status = 'pending') => {
    const { data } = await axiosPrivate.get('/orders', {
        params: { status },
    });
    return data.data;
};

const useFetchOrders = ({ status }) => {
    return useQuery(['orders', status], () => fetchOrders(status), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        staleTime: 30000, // Set the stale time to 30 seconds
        retry: 1, // Set the number of retries to 1
    });
};

export default useFetchOrders;
