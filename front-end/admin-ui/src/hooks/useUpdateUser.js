import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const updateUser = async (userData) => {
    const { data } = await axiosPrivate.put(
        `/users/${userData.userId}/profile`,
        {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
        }
    );
    return data.data;
};

const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            toast.success('User information updated successfully');
            // Invalidate and refetch users data to refresh the UI
            queryClient.invalidateQueries(['customers']);
        },
        onError: (error) => {
            toast.error(error.message || 'Failed to update user information');
        },
    });
};

export default useUpdateUser;
