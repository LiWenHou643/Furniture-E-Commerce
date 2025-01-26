import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

const fetchColor = async () => {
    const response = await axiosPublic.get('/colors');
    return response.data?.data; // Axios automatically parses JSON
};

const useFetchColor = () => {
    return useQuery(['colors'], fetchColor, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchInterval: false,
        retry: 1,
        staleTime: 30000,
    });
};

export default useFetchColor;
