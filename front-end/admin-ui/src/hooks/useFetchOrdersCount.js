import { useQuery } from '@tanstack/react-query';
import axiosPrivate from '../api/axiosPrivate';

const fetchOrderCountByDayAndStatus = async ({ year, month, day }) => {
    console.log('fetchOrderCountByDay', { year, month, day });
    const { data } = await axiosPrivate.get('/orders/order-count-by-date', {
        params: {
            year,
            month,
            day,
        },
    });
    return data.data;
};

const fetchOrderCountByMonthAndStatus = async ({ year, month }) => {
    console.log('fetchOrderCountByMonth', { year, month });
    const { data } = await axiosPrivate.get('/orders/order-count-by-month', {
        params: {
            year,
            month,
        },
    });
    return data.data;
};

const fetchOrderCountByMonth = async ({ year, month }) => {
    console.log('fetchOrderCountByMonth', { year, month });
    const { data } = await axiosPrivate.get('/orders/total-by-month', {
        params: {
            year,
            month,
        },
    });
    return data.data;
};

const fetchOrderCountByYear = async ({ year }) => {
    const { data } = await axiosPrivate.get('/orders/total-by-year', {
        params: {
            year,
        },
    });
    return data.data;
};

const fetchMonthly = async ({ year }) => {
    const { data } = await axiosPrivate.get('/orders/monthly-count', {
        params: {
            year,
        },
    });
    return data.data;
};

const useFetchOrderCountByDayAndStatus = (
    { year, month, day } = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
    }
) => {
    return useQuery(
        ['order-count-day', { year, month, day }],
        () =>
            fetchOrderCountByDayAndStatus({
                year,
                month,
                day,
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

const useFetchOrderCountByMonthAndStatus = (
    { year, month } = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    }
) => {
    return useQuery(
        ['order-count-month-status', { year, month }],
        () => fetchOrderCountByMonthAndStatus({ year, month }),
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

const useFetchOrderCountByMonth = (
    { year, month } = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    }
) => {
    return useQuery(
        ['order-count-month', { year, month }],
        () => fetchOrderCountByMonth({ year, month }),
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

const useFetchOrderCountByYear = (
    { year } = {
        year: new Date().getFullYear(),
    }
) => {
    return useQuery(
        ['order-count-year', { year }],
        () => fetchOrderCountByYear({ year }),
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

const useFetchMonthly = (
    { year } = {
        year: new Date().getFullYear(),
    }
) => {
    return useQuery(['monthly', { year }], () => fetchMonthly({ year }), {
        keepPreviousData: true, // Avoid loading state when changing pages
        refetchOnWindowFocus: false, // Avoid refetching data on window focus
        refetchOnReconnect: false, // Avoid refetching data on network reconnect
        refetchInterval: false, // Avoid refetching data on interval
        retry: 1, // Set the number of retries to 2
        staleTime: 30000, // Set the stale time to 30 seconds
    });
};

export {
    useFetchMonthly,
    useFetchOrderCountByDayAndStatus,
    useFetchOrderCountByMonth,
    useFetchOrderCountByMonthAndStatus,
    useFetchOrderCountByYear,
};
