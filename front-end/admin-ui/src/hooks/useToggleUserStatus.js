import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const toggleUserStatus = async (userId) => {
    const { data } = await axiosPrivate.put(`/users/${userId}/status`);

    return data?.data;
};

const useToggleUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation(toggleUserStatus, {
        onSuccess: () => {
            queryClient.invalidateQueries('customers');
            toast.success('User banned successfully');
        },
        onError: () => {
            toast.error('Failed to ban user');
        },
    });
};

export default useToggleUserStatus;
