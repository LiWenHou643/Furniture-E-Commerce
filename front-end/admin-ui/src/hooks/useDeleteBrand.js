import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const deleteBrand = async (brandId) => {
    const response = await axiosPrivate.delete(`/brands/${brandId}`);
    return response.data;
};

const useDeleteBrand = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteBrand, {
        onSuccess: () => {
            queryClient.invalidateQueries('brands');
            toast.success('Brand deleted successfully');
        },
        onError: () => {
            toast.error('An error occurred. Please try again.');
        },
    });
};

export default useDeleteBrand;
