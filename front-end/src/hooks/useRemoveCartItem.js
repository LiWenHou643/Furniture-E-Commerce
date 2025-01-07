import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance
const removeCartItem = async (cartItemId) => {
    console.log('Removing from cart', cartItemId);
    const response = await axiosPrivate.delete(`/carts/items/${cartItemId}`);
    return response.data;
};

const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: removeCartItem,
        onSuccess: (data) => {
            console.log('Removed from cart', data);

            // Invalidate the cart query to trigger a refresh
            queryClient.invalidateQueries(['cart']);
            // Show a success toast
            toast.success('Removed!');
        },
        onError: (error) => {
            console.error('Failed to remove', error);
            // Show an error toast
            toast.error('Failed to remove');
        },
    });
};

export default useRemoveCartItem;
