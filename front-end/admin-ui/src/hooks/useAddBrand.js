import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const addBrand = async (brand) => {
    const { data } = await axiosPrivate.post('/brands', brand);
    return data;
};

const useAddBrand = () => {
    const queryClient = useQueryClient();
    return useMutation(addBrand, {
        onSuccess: () => {
            queryClient.invalidateQueries('brands');
            toast.success('Brand added successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export default useAddBrand;
