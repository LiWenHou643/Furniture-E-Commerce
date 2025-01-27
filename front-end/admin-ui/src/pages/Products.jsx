import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { debounce } from 'lodash';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useFetchProducts from '../hooks/useFetchProducts';

import { useEffect, useRef } from 'react';

const itemPerPage = 10;

export default function ProductManagement() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    const {
        data: products,
        isLoading,
        error,
    } = useFetchProducts({
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

    // Handle search input change
    const handleSearch = (event) => {
        const keyword = event.target.value;
        debouncedSearchRef.current(keyword); // Call the debounced function
    };

    // Clean up debounce function on component unmount
    useEffect(() => {
        const debouncedFn = debouncedSearchRef.current;
        return () => {
            debouncedFn.cancel(); // Cancel any pending debounced calls
        };
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    // Calculate the page range based on the current page and total items
    const handlePageChange = (event, page) => {
        const currentParams = Object.fromEntries(searchParams.entries()); // Get all current search parameters
        const updatedParams = { ...currentParams, page: page.toString() }; // Merge with the new page number
        setSearchParams(updatedParams); // Update the search params
        navigate(`?${new URLSearchParams(updatedParams).toString()}`); // Optionally navigate to the updated URL
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleDelete = (productId) => {};

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Product Management
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    mb: 2,
                }}
            >
                {/* Add Product Button */}
                <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/products-management/add')}
                >
                    Add Product
                </Button>

                {/* Search Bar */}
                <Box sx={{ flexGrow: 1, maxWidth: '600px', ml: 2 }}>
                    <TextField
                        fullWidth
                        label='Search Products'
                        variant='outlined'
                        size='small'
                        onChange={(e) => handleSearch(e)}
                    />
                </Box>
            </Box>

            {/* Product Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Name
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', width: '15%' }}
                            >
                                Category
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', width: '15%' }}
                            >
                                Brand
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', width: '15%' }}
                            >
                                Material
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', width: '15%' }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.content?.map((product) => (
                            <TableRow key={product.productId}>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>
                                    {product.category.categoryName}
                                </TableCell>
                                <TableCell>{product.brand.brandName}</TableCell>
                                <TableCell>
                                    {product.material.materialName}
                                </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() =>
                                            navigate(
                                                '/products-management/edit/' +
                                                    product.productId
                                            )
                                        }
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    ></EditIcon>
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(product.productId)
                                        }
                                        color='error'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    ></DeleteIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            {
                // Display pagination component only if there are more than 1 page
                products?.page?.totalPages > 1 && (
                    <Stack
                        spacing={2}
                        direction='row'
                        justifyContent='center'
                        sx={{ marginTop: 3 }}
                    >
                        <Pagination
                            count={Math.ceil(products?.page?.totalPages)} // Total pages
                            page={currentPage}
                            onChange={handlePageChange}
                            color='primary'
                        />
                    </Stack>
                )
            }
        </Box>
    );
}
