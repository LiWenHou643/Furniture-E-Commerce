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
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 0,
        cacheTime: 0,
        retry: 1,
    });
};

const useFetchSummary = () => {
    return useQuery(['summary'], () => fetchSummary(), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 0,
        cacheTime: 0,
        retry: 1,
    });
};

const useFetchThisMonth = () => {
    return useQuery(['this-month'], () => fetchThisMonth(), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 0,
        cacheTime: 0,
        retry: 1,
    });
};

const useFetchMonthly = () => {
    return useQuery(['monthly'], () => fetchMonthly(), {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 0,
        cacheTime: 0,
        retry: 1,
    });
};

export { useFetchMonthly, useFetchSummary, useFetchThisMonth, useFetchToday };
