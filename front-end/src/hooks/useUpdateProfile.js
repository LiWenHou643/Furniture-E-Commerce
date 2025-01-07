import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance
const updateProfile = async ({
    firstName,
    lastName,
    email,
    phoneNumber,
    avatar,
}) => {
    console.log('Updating profile...');
    const response = await axiosPrivate.put('/users/profile', {
        firstName,
        lastName,
        email,
        phoneNumber,
        avatar,
    });
    return response.data;
};

const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            console.log('Updated profile!', data);

            // Invalidate the profile query to trigger a refresh
            queryClient.invalidateQueries(['profile']);

            // Show a success toast
            toast.success('Updated profile!');
        },
        onError: (error) => {
            console.error('Failed to update', error);
            // Show an error toast
            toast.error('Failed to update');
        },
    });
};

export default useUpdateProfile;
