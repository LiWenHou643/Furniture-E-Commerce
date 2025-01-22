import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance

const uploadAvatar = async (avatar) => {
    const formData = new FormData();
    formData.append('file', avatar);

    const response = await axiosPrivate.post('/users/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadAvatar,
        onSuccess: (data) => {
            console.log('Uploaded avatar!', data);

            // Invalidate the profile query to trigger a refresh
            queryClient.invalidateQueries(['profile'], {
                refetchActive: true,
                refetchInactive: true,
            });

            // Show a success toast
            toast.success('Uploaded avatar!');
        },
        onError: (error) => {
            console.error('Failed to upload', error);
            // Show an error toast
            toast.error('Failed to upload');
        },
    });
};

export default useUploadAvatar;
