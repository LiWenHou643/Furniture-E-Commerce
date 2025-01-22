import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance
const updateCartItem = async ({ cartItemId, productItemId, quantity }) => {
    const response = await axiosPrivate.put('/carts/items', {
        cartItemId,
        productItemId,
        quantity,
    });
    return response.data;
};

const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCartItem,
        onSuccess: (data) => {
            console.log('Updated cart item!', data);
            // Invalidate the cart query to trigger a refresh
            queryClient.invalidateQueries(['cart']);
            // Show a success toast
            toast.success('Updated cart item!');
        },
        onError: (error) => {
            console.error('Failed to update', error);
            // Show an error toast
            toast.error('Failed to update');
        },
    });
};

export default useUpdateCartItem;
