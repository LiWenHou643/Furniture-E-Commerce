import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchCustomers = async ({ page = 0, size = 10 }) => {
    const { data } = await axiosPrivate.get('/users', {
        params: {
            page,
            size,
        },
    });
    return data.data;
};

const useFetchCustomers = ({ page, size }) => {
    return useQuery(
        ['customers', { page, size }],
        () =>
            fetchCustomers({
                page,
                size,
            }),
        {
            keepPreviousData: true, // Avoid loading state when changing pages
            refetchOnWindowFocus: false, // Avoid refetching data on window focus
            refetchOnReconnect: false, // Avoid refetching data on network reconnect
            refetchInterval: false, // Avoid refetching data on interval
            retry: 1, // Set the number of retries to 2
            staleTime: 30000, // Set the stale time to 30 seconds
        }
    );
};

export default useFetchCustomers;
