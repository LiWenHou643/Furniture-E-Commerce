import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Chip,
    MenuItem,
    Pagination,
    Paper,
    Select,
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
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import useFetchOrders from '../hooks/useFetchOrders';
import { formatDate } from '../utils/helper';

const filterStatusList = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
];

export default function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = searchParams.get('page') || 1;
    const filterStatus = searchParams.get('filterStatus') || 'pending';
    const { data: ordersData, isLoading } = useFetchOrders({
        page: currentPage - 1,
        size: 10,
        status: searchParams.get('filterStatus') || 'pending',
    });

    const handleSearch = (e) => setSearch(e.target.value);

    const handleFilterChange = (e) => {
        searchParams.set('filterStatus', e.target.value);
        setSearchParams(searchParams); // Update URL
    };

    const handlePageChange = (e, page) => {
        searchParams.set('page', page);
        setSearchParams(searchParams); // Update URL
    };

    useEffect(() => {
        if (ordersData) {
            console.log(ordersData.content);
            setOrders(ordersData.content);
        }
    }, [ordersData]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Order Management
            </Typography>

            {/* Filters and Search */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    label='Search by Order ID or Customer Name'
                    variant='outlined'
                    size='small'
                    value={search}
                    onChange={handleSearch}
                />
                <Select
                    value={filterStatus}
                    onChange={handleFilterChange}
                    displayEmpty
                    size='small'
                    sx={{ width: 200 }}
                >
                    {filterStatusList.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                            {status.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {/* Orders Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Created at</TableCell>
                            <TableCell>Updated at</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>
                                    <OrderStatus status={order.orderStatus} />
                                </TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    {formatDate(order.createdAt)}
                                </TableCell>
                                <TableCell>
                                    {formatDate(order.updatedAt)}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        size='small'
                                        variant='outlined'
                                        startIcon={<VisibilityIcon />}
                                        onClick={() =>
                                            navigate(
                                                `/orders-management/${order.orderId}`
                                            )
                                        }
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            {
                // Display pagination component only if there are more than 1 page
                ordersData.page.totalPages > 1 && (
                    <Stack
                        sx={{ mt: 3 }}
                        direction='row'
                        justifyContent='center'
                        alignItems='center'
                        spacing={2}
                    >
                        <Pagination
                            count={ordersData.totalPages}
                            page={parseInt(currentPage)}
                            onChange={handlePageChange}
                        />
                    </Stack>
                )
            }
        </Box>
    );
}

const OrderStatus = ({ status }) => {
    const statusMap = {
        pending: { label: 'Pending', color: 'warning' },
        processing: { label: 'Processing', color: 'info' },
        shipped: { label: 'Shipped', color: 'success' },
        delivered: { label: 'Delivered', color: 'success' },
        cancelled: { label: 'Cancelled', color: 'error' },
    };

    return (
        <Chip
            label={statusMap[status]?.label || 'Unknown'}
            color={statusMap[status]?.color || 'default'} // Fallback to "default" if status is not found
        />
    );
};
