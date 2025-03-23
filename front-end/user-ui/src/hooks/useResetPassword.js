import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const resetPassword = async ({ username }) => {
    const response = await axiosPrivate.post('/auth/reset-password', {
        username,
    });
    return response.data;
};

const useResetPassword = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            console.log('Password reset', data);
            queryClient.invalidateQueries(['user']);
            toast.success('Password reset successfully - check your email');
        },
        onError: (error) => {
            console.error('Failed to reset password', error);
            toast.error('Failed to reset password');
        },
    });
};

export default useResetPassword;
