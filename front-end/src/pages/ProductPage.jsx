// src/components/ProductPage.js
import { Box, Container, Grid, Stack, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../features/products/ProductCard';
import ProductSideBar from '../features/products/ProductSideBar';

const ProductPage = () => {
    const itemsPerPage = 10;
    const totalItems = 100;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const navigate = useNavigate();

    // Calculate the page range based on the current page and total items
    const handlePageChange = (event, page) => {
        setSearchParams({ page: page.toString() });
        // Optionally, you can navigate to another path if required, e.g. '/items?page={page}'
        navigate(`?page=${page}`);
    };

    return (
        <Container maxWidth='lg' sx={{ marginTop: 10 }}>
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

                {/* Layout with Sidebar and Product Grid */}
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
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <ProductCard />
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination Component */}
                        <Stack
                            spacing={2}
                            direction='row'
                            justifyContent='center'
                            sx={{ marginTop: 3 }}
                        >
                            <Pagination
                                count={Math.ceil(totalItems / itemsPerPage)} // Total pages
                                page={currentPage}
                                onChange={handlePageChange}
                                color='primary'
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ProductPage;
