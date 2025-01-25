import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const addMaterial = async (material) => {
    const { data } = await axiosPrivate.post('/materials', material);
    return data;
};

const useAddMaterial = () => {
    const queryClient = useQueryClient();
    return useMutation(addMaterial, {
        onSuccess: () => {
            queryClient.invalidateQueries('materials');
            toast.success('Material updated successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export default useAddMaterial;
