import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const confirmOrder = async (orderId) => {
    const { data } = await axiosPrivate.put(
        `/orders/management/${orderId}/confirm`
    );
    return data;
};

const useConfirmOrder = () => {
    const queryClient = useQueryClient();
    return useMutation(confirmOrder, {
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries('orders');
            queryClient.invalidateQueries('order', variables.orderId);

            toast.success('Order confirmed successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export default useConfirmOrder;
