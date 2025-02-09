// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

const fetchProductById = async (productId) => {
    const response = await axiosPublic.get(`/products/${productId}`);
    return response.data?.data; // Axios automatically parses JSON
};

const useFetchProduct = ({ productId }) => {
    return useQuery(
        ['product', Number(productId)],
        () => fetchProductById(productId),
        {
            keepPreviousData: true, // Avoid loading state when changing pages
            refetchOnWindowFocus: false, // Avoid refetching data on window focus
            refetchOnReconnect: false, // Avoid refetching data on network reconnect
            refetchInterval: false, // Avoid refetching data on interval
            staleTime: 30000, // Set the stale time to 30 seconds
            retry: 1, // Set the number of retries to 2
        }
    );
};

export default useFetchProduct;
