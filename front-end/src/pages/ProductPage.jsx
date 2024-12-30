// src/components/ProductPage.js
import { Box, Container, Grid, Stack, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import ProductCard from '../features/products/ProductCard';
import ProductSideBar from '../features/products/ProductSideBar';
import useFetchProducts from '../hooks/useFetchProducts';

const itemPerPage = 12;

const ProductPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const navigate = useNavigate();

    const { data, isLoading, error, isFetching } = useFetchProducts({
        page: currentPage - 1,
        size: itemPerPage,
    });

    if (error) return <Error error={error} />;

    // Calculate the page range based on the current page and total items
    const handlePageChange = (event, page) => {
        setSearchParams({ page: page.toString() });
        // Optionally, you can navigate to another path if required, e.g. '/items?page={page}'
        navigate(`?page=${page}`);
    };

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
                    />
                </Box>

                {/* Loading Spinner */}
                {isLoading || isFetching ? (
                    <Loading />
                ) : (
                    // Product Grid
                    <Grid container spacing={2}>
                        {/* Sidebar */}
                        <Grid
                            item
                            xs={3}
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            <ProductSideBar />
                        </Grid>

                        {/* Product Grid */}
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
                                                key={product.productId}
                                                product={product}
                                            />
                                        </Grid>
                                    ))
                                ) : (
                                    <p>No products available</p>
                                )}
                            </Grid>

                            {/* Pagination Component */}
                            <Stack
                                spacing={2}
                                direction='row'
                                justifyContent='center'
                                sx={{ marginTop: 3 }}
                            >
                                <Pagination
                                    count={Math.ceil(data?.totalPages)} // Total pages
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    color='primary'
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default ProductPage;
