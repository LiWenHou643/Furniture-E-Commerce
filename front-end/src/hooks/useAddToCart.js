import { useMutation } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance

const addToCart = async ({ productItemId, quantity }) => {
    const response = await axiosPrivate.post('/carts/items', {
        productItemId,
        quantity,
    });
    return response.data;
};

const useAddToCart = () => {
    return useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            console.log('Added to cart', data);
        },
        onError: (error) => {
            console.error('Failed to add to cart', error);
        },
    });
};

export default useAddToCart;
