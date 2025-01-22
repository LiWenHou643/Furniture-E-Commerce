import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const cancelOrder = async ({ orderId }) => {
    const response = await axiosPrivate.put(`/orders/${orderId}/cancel`);
    return response.data;
};

const useCancelOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelOrder,
        onSuccess: (data) => {
            console.log('Order cancelled', data.data.orderId);
            const orderId = data.data.orderId;

            // Invalidate the specific order query
            queryClient.invalidateQueries(['order', orderId]);

            // Invalidate the list of orders query
            queryClient.invalidateQueries(['orders']);

            toast.success('Order cancelled');
        },
        onError: (error) => {
            console.error('Failed to cancel order', error);
            toast.error('Failed to cancel order');
        },
    });
};

export default useCancelOrder;
