import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const deleteMaterial = async (materialId) => {
    const response = await axiosPrivate.delete(`/materials/${materialId}`);
    return response.data;
};

const useDeleteMaterial = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteMaterial, {
        onSuccess: () => {
            queryClient.invalidateQueries('materials');
            toast.success('Material deleted successfully');
        },
        onError: () => {
            toast.error('An error occurred. Please try again.');
        },
    });
};

export default useDeleteMaterial;
