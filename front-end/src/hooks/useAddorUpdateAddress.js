import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance
const updateAddress = async ({
    addressId,
    city,
    district,
    ward,
    streetAddress,
}) => {
    const response = await axiosPrivate.post('/users/address', {
        addressId,
        city,
        district,
        ward,
        streetAddress,
    });
    return response.data;
};

const useAddorUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAddress,
        onSuccess: (data) => {
            console.log('Updated address!', data);

            // Invalidate the profile query to trigger a refresh
            queryClient.invalidateQueries(['profile']);

            // Show a success toast
            toast.success('Updated address!');
        },
        onError: (error) => {
            console.error('Failed to update', error);
            // Show an error toast
            toast.error('Failed to update');
        },
    });
};

export default useAddorUpdateAddress;
