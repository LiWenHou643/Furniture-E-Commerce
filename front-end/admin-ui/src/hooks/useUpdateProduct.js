import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const updateProduct = async (product) => {
    const response = await axiosPrivate.put(`/products`, product);
    return response.data;
};

const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(updateProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            toast.success('Product updated successfully!');
        },
        onError: (error) => {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        },
    });

    return mutation;
};

export default useUpdateProduct;
