import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchOrder = async ({ orderId }) => {
    const { data } = await axiosPrivate.get(`/orders/${orderId}`);
    return data.data;
};

const useFetchOrder = (orderId) => {
    return useQuery(['order', orderId], () => fetchOrder({ orderId }), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        staleTime: 30000,
        retry: 1,
    });
};

export default useFetchOrder;
