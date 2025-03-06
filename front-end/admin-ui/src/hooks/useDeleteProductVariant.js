import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const deleteProductVariant = async (productItemId) => {
    const response = await axiosPrivate.delete(
        `/products/product-items/${productItemId}`
    );
    return response.data;
};

const useDeleteProductVariant = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteProductVariant, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('products');
            queryClient.invalidateQueries('product', data?.data?.productId);
            toast.success('Product variant deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete product variant');
        },
    });
};

export default useDeleteProductVariant;
