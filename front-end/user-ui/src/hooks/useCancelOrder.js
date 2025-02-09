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
        onSuccess: (data, variables) => {
            const stringOrderId = String(variables.orderId);
            // Invalidate the specific order query
            queryClient.invalidateQueries(['order', stringOrderId]);

            // Invalidate the list of orders query
            queryClient.invalidateQueries(['orders']);

            // Invalidate the products query
            queryClient.invalidateQueries(['products']);

            // Invalidate the specific product query
            const { data: order } = data;

            order.orderDetails.forEach((orderItem) => {
                queryClient.invalidateQueries(['product', orderItem.productId]);
            });

            toast.success('Order cancelled');
        },
        onError: (error) => {
            console.error('Failed to cancel order', error);
            toast.error('Failed to cancel order');
        },
    });
};

export default useCancelOrder;
