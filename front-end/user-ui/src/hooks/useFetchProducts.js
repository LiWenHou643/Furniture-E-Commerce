// hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../api/axiosPublic';

// Fetch products with pagination
const fetchProducts = async ({ queryKey }) => {
    const [
        _key,
        {
            page,
            size,
            categories,
            brands,
            materials,
            minPrice,
            maxPrice,
            minRating,
            keyword,
        },
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
            minRating,
            keyword,
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
    minRating,
    keyword,
}) => {
    return useQuery(
        [
            'products',
            {
                page,
                size,
                categories,
                brands,
                materials,
                minPrice,
                maxPrice,
                minRating,
                keyword,
            },
        ],
        fetchProducts,
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

export default useFetchProducts;
