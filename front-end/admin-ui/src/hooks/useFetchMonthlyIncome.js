import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchMonthlyIncome = async ({ year }) => {
    const { data } = await axiosPrivate.get('/payments/monthly-income', {
        params: {
            year,
        },
    });
    return data.data;
};

const useFetchMonthlyIncome = (
    { year } = {
        year: new Date().getFullYear(),
    }
) => {
    return useQuery(
        ['monthly-income', year],
        () => fetchMonthlyIncome({ year }),
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

export default useFetchMonthlyIncome;
