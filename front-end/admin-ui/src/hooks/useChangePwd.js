import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const changePwd = async ({ oldPassword, newPassword }) => {
    const response = await axiosPrivate.put('/users/password', {
        oldPassword,
        newPassword,
    });
    return response.data;
};

const useChangePwd = () => {
    const queryClient = useQueryClient();
    return useMutation(changePwd, {
        onSuccess: () => {
            queryClient.invalidateQueries('profile');
            toast.success('Password changed successfully');
        },
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export default useChangePwd;
