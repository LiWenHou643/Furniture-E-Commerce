import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const reOrder = async ({ orderId }) => {
    const response = await axiosPrivate.post(`/orders/${orderId}/reorder`);
    return response.data;
};

const useReOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reOrder,
        onSuccess: (data) => {
            console.log('Order reordered', data);
            queryClient.invalidateQueries(['order', data.id]);
            queryClient.invalidateQueries(['orders']);
            toast.success('Order reordered');
        },
        onError: (error) => {
            console.error('Failed to reorder order', error);
            toast.error('Failed to reorder order');
        },
    });
};

export default useReOrder;
