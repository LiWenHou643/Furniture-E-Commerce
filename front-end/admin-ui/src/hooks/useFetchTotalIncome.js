import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate'; // The Axios instance

const fetchTotalIncome = async () => {
    const { data } = await axiosPrivate.get('/payments/total-income');
    return data.data;
};

const useFetchTotalIncome = () => {
    return useQuery(['totalIncome'], fetchTotalIncome, {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export default useFetchTotalIncome;
