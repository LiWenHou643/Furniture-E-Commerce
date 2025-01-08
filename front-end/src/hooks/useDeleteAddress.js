import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance

const deleteAddress = async (addressId) => {
    console.log('Deleting address', addressId);
    const response = await axiosPrivate.delete(`/users/address/${addressId}`);
    return response.data;
};

const useDeleteAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAddress,
        onSuccess: (data) => {
            console.log('Deleted address', data);

            // Invalidate the addresses query to trigger a refresh
            queryClient.invalidateQueries(['profile']);
            // Show a success toast
            toast.success('Deleted!');
        },
        onError: (error) => {
            console.error('Failed to delete', error);
            // Show an error toast
            toast.error('Failed to delete');
        },
    });
};

export default useDeleteAddress;
