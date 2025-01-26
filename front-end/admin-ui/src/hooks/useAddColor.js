import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const addColor = async (color) => {
    const { data } = await axiosPrivate.post('/colors', color);
    return data;
};

const useAddColor = () => {
    const queryClient = useQueryClient();
    return useMutation(addColor, {
        onSuccess: () => {
            queryClient.invalidateQueries('colors');
            toast.success('Color added successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export default useAddColor;
