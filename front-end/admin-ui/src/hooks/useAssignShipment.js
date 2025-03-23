import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const assignShipment = async (orderId) => {
    const { data } = await axiosPrivate.put(
        `/orders/management/${orderId}/ship`
    );
    return data;
};

const useAssignShipment = () => {
    const queryClient = useQueryClient();
    return useMutation(assignShipment, {
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

export default useAssignShipment;
