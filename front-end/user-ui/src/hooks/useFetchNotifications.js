import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosPrivate from '../api/axiosPrivate';

const fetchNotifications = async () => {
    const { data } = await axiosPrivate.get('/notifications');
    return data.data;
};

const useFetchNotifications = () => {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: fetchNotifications,
        onError: (error) => {
            console.error('Failed to fetch notifications', error);
            // Show an error toast
            toast.error('Failed to fetch notifications');
        },
    });
};

export default useFetchNotifications;
