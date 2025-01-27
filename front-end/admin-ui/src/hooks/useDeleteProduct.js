import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const deleteProduct = async (productId) => {
    const response = await axiosPrivate.delete(`/products/${productId}`);
    return response.data;
};

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            toast.success('Product deleted successfully');
        },
        onError: () => {
            toast.error('An error occurred. Please try again.');
        },
    });
};

export default useDeleteProduct;
