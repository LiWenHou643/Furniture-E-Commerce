import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const addCategory = async (category) => {
    const { data } = await axiosPrivate.post('/categories', category);
    return data;
};

const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation(addCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories');
            toast.success('Category updated successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export default useAddCategory;
