import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';
const addToCart = async ({ productItemId, quantity }) => {
    const response = await axiosPrivate.post('/carts/items', {
        productItemId,
        quantity,
    });
    return response.data;
};

const useAddToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            console.log('Added to cart', data);
            queryClient.invalidateQueries(['cart']);
            // Show a success toast
            toast.success('Added to cart');
        },
        onError: (error) => {
            console.error('Failed to add to cart', error);
            // Show an error toast
            toast.error('Failed to add to cart');
        },
    });
};

export default useAddToCart;
