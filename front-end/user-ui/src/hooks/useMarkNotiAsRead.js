import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const markNotiAsRead = async (notificationIds) => {
    const { data } = await axiosPrivate.put('/notifications', notificationIds); // Send a plain array
    return data;
};

const useMarkNotiAsRead = () => {
    const queryClient = useQueryClient();
    return useMutation(markNotiAsRead, {
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(['notifications']);
        },
    });
};

export default useMarkNotiAsRead;
