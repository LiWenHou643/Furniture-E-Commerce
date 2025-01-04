// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

// Fetch products with pagination
const fetchProducts = async ({ queryKey }) => {
    const [
        _key,
        { page, size, categories, brands, materials, minPrice, maxPrice },
    ] = queryKey;
    const response = await axiosPublic.get('/products', {
        params: {
            page,
            size,
            categories,
            brands,
            materials,
            minPrice,
            maxPrice,
        }, // Pass page and size as query params
    });
    return response.data?.data; // Axios automatically parses JSON
};

// Custom hook for fetching paginated products
const useFetchProducts = ({
    page,
    size,
    categories,
    brands,
    materials,
    minPrice,
    maxPrice,
}) => {
    return useQuery(
        [
            'products',
            { page, size, categories, brands, materials, minPrice, maxPrice },
        ],
        fetchProducts,
        {
            // Keep previous data when fetching new data
            keepPreviousData: true, // Avoid loading state when changing pages

            // Refetch data on window focus
            refetchOnWindowFocus: false, // Avoid refetching data on window focus

            // Refetch data on network reconnect
            refetchOnReconnect: false, // Avoid refetching data on network reconnect

            // Refetch data on interval
            refetchInterval: false, // Avoid refetching data on interval

            // Refetch data on mount
            refetchOnMount: false, // Avoid refetching data on mount

            // Retry failed requests
            retry: 2, // Set the number of retries to 2

            // Stale time
            staleTime: 30000, // Set the stale time to 30 seconds
        }
    );
};

export default useFetchProducts;
