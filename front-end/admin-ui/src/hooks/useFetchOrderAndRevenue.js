import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchToday = async () => {
    const { data } = await axiosPrivate.get('/orders/today');
    return data.data;
};

const fetchSummary = async () => {
    const { data } = await axiosPrivate.get('/orders/summary');
    return data.data;
};

const fetchThisMonth = async () => {
    const { data } = await axiosPrivate.get('/orders/this-month');
    return data.data;
};

const fetchMonthly = async () => {
    const { data } = await axiosPrivate.get('/orders/monthly');
    return data.data;
};

const useFetchToday = () => {
    return useQuery(['today'], () => fetchToday(), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

const useFetchSummary = () => {
    return useQuery(['summary'], () => fetchSummary(), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

const useFetchThisMonth = () => {
    return useQuery(['this-month'], () => fetchThisMonth(), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

const useFetchMonthly = () => {
    return useQuery(['monthly'], () => fetchMonthly(), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export { useFetchMonthly, useFetchSummary, useFetchThisMonth, useFetchToday };
