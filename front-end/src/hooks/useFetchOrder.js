import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchOrder = async ({ orderId }) => {
    console.log('Fetching order', orderId);
    const { data } = await axiosPrivate.get(`/orders/${orderId}`);
    return data.data;
};

const useFetchOrder = (orderId) => {
    console.log('useQuery key:', ['order', orderId]);
    return useQuery(['order', orderId], () => fetchOrder({ orderId }), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 0,
        cacheTime: 0,
        retry: 1,
    });
};

export default useFetchOrder;
