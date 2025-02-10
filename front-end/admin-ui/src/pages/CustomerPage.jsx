import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
    Avatar,
    Box,
    IconButton,
    Pagination,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import useFetchCustomers from '../hooks/useFetchCustomers';
const CustomerPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const { data: customers, isLoading } = useFetchCustomers({
        page: currentPage - 1,
        size: 8,
    });

    if (isLoading) {
        return <Loading />;
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

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Customers Management
            </Typography>

            {/* Search Input */}
            <TextField
                label='Search by Name, Email, Phone'
                variant='outlined'
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
                }}
                sx={{ marginBottom: 2 }}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers?.content?.map((customer) => (
                            <TableRow key={customer.userId}>
                                {/* User ID */}
                                <TableCell>{customer.userId}</TableCell>

                                {/* Avatar */}
                                <TableCell>
                                    <Avatar
                                        src={customer.avatar || ''}
                                        alt={customer.firstName}
                                    />
                                </TableCell>

                                {/* Full Name */}
                                <TableCell>
                                    <Typography>
                                        {customer.firstName} {customer.lastName}
                                    </Typography>
                                </TableCell>

                                {/* Email */}
                                <TableCell>{customer.email}</TableCell>

                                {/* Phone Number */}
                                <TableCell>{customer.phoneNumber}</TableCell>

                                {/* User Status */}
                                <TableCell>
                                    <Switch
                                        checked={customer.userStatus}
                                        color='primary'
                                    />
                                </TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <Tooltip title='Edit'>
                                        <IconButton color='primary'>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title='Delete'>
                                        <IconButton color='error'>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            {
                // Display pagination component only if there are more than 1 page
                customers?.page?.totalPages > 1 && (
                    <Stack
                        spacing={2}
                        direction='row'
                        justifyContent='center'
                        sx={{ marginTop: 3 }}
                    >
                        <Pagination
                            count={Math.ceil(customers?.page?.totalPages)} // Total pages
                            page={currentPage}
                            onChange={handlePageChange}
                            color='primary'
                        />
                    </Stack>
                )
            }
        </Box>
    );
};

export default CustomerPage;
