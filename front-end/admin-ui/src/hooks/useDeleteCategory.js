import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const deleteCategory = async (categoryId) => {
    const response = await axiosPrivate.delete(`/categories/${categoryId}`);
    return response.data;
};

const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            toast.success('Category deleted successfully');
        },
        onError: () => {
            toast.error('An error occurred. Please try again.');
        },
    });
};

export default useDeleteCategory;
