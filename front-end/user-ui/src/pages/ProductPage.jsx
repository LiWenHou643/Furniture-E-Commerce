// src/components/ProductPage.js
import {
    Box,
    Container,
    Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductCard from '../features/products/ProductCard';
import ProductSideBar from '../features/products/ProductSideBar';
import useFetchProducts from '../hooks/useFetchProducts';

const itemPerPage = 12;

const ProductPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const { data, isLoading, isFetching } = useFetchProducts({
        page: currentPage - 1,
        size: itemPerPage,
        categories: searchParams.get('categories'),
        brands: searchParams.get('brands'),
        materials: searchParams.get('materials'),
        minPrice: searchParams.get('minPrice'),
        maxPrice: searchParams.get('maxPrice'),
        minRating: searchParams.get('stars'),
        keyword: searchParams.get('keyword'),
    });

    // Calculate the page range based on the current page and total items
    const handlePageChange = (event, page) => {
        const currentParams = Object.fromEntries(searchParams.entries()); // Get all current search parameters
        const updatedParams = { ...currentParams, page: page.toString() }; // Merge with the new page number
        setSearchParams(updatedParams); // Update the search params
        navigate(`?${new URLSearchParams(updatedParams).toString()}`); // Optionally navigate to the updated URL
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Create a ref to hold the debounced function
    const debouncedSearchRef = useRef(
        debounce((keyword) => {
            const currentParams = Object.fromEntries(searchParams.entries());
            const updatedParams = { ...currentParams, keyword };
            setSearchParams(updatedParams);
            navigate(`?${new URLSearchParams(updatedParams).toString()}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500) // Adjust debounce delay as needed
    );

    const handleSearch = (event) => {
        const keyword = event.target.value;
        const currentParams = Object.fromEntries(searchParams.entries()); // Get all current search params
        const updatedParams = { ...currentParams, keyword }; // Merge with the updated keyword
        setSearchParams(updatedParams); // Set the new search parameters
        navigate(`?${new URLSearchParams(updatedParams).toString()}`); // Update the URL
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Clean up debounce function on component unmount
    useEffect(() => {
        const debouncedFn = debouncedSearchRef.current;
        return () => {
            debouncedFn.cancel(); // Cancel any pending debounced calls
        };
    }, []);

    return (
        <Container maxWidth='lg' sx={{ marginTop: 15 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Search Bar */}
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        label='Search Products'
                        variant='outlined'
                        size='small'
                        sx={{ marginBottom: 2 }}
                        onChange={(e) => handleSearch(e)}
                    />
                </Box>
                <Grid container spacing={2}>
                    {/* Sidebar */}
                    <Grid
                        item
                        xs={3}
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <ProductSideBar />
                    </Grid>
                    {/* Loading Spinner */}
                    {isLoading || isFetching ? (
                        <Loading margin='auto' />
                    ) : (
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                {/* Here, map over your products data */}
                                {data?.content?.length > 0 ? (
                                    data.content.map((product, index) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={index}
                                        >
                                            <ProductCard
                                                key={
                                                    product.productId +
                                                    product.productName
                                                }
                                                product={product}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography margin='auto'>
                                        No products available
                                    </Typography>
                                )}
                            </Grid>

                            {/* Pagination Component */}
                            {
                                // Display pagination component only if there are more than 1 page
                                data?.page?.totalPages > 1 && (
                                    <Stack
                                        spacing={2}
                                        direction='row'
                                        justifyContent='center'
                                        sx={{ marginTop: 3 }}
                                    >
                                        <Pagination
                                            count={Math.ceil(
                                                data?.page?.totalPages
                                            )} // Total pages
                                            page={currentPage}
                                            onChange={handlePageChange}
                                            color='primary'
                                        />
                                    </Stack>
                                )
                            }
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default ProductPage;
