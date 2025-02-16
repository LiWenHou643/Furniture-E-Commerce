import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Chip,
    MenuItem,
    Modal,
    Pagination,
    Paper,
    Select,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);
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

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setOpenModal(false);
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
                                        onClick={() => handleOpenModal(order)}
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

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    selectedOrder={selectedOrder}
                />
            )}
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
// Status Mapping for Progress Bar
const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
const OrderDetailsModal = ({ openModal, handleCloseModal, selectedOrder }) => {
    const [deliveryService, setDeliveryService] = useState('');
    const [orderStatus, setOrderStatus] = useState(
        selectedOrder?.orderStatus || 'Pending'
    );

    const handleConfirmOrder = () => {
        // Logic to confirm the order
        // Update order status and trigger necessary processes
    };

    const handleAssignDelivery = () => {
        // Logic to assign the order to a delivery service
        // Send order details to the selected delivery service
    };

    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant='h6'>Order Details</Typography>
                    <IconButton onClick={handleCloseModal}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant='body1'>
                    <strong>Order ID:</strong> {selectedOrder?.orderId}
                </Typography>
                <Typography variant='body1'>
                    <strong>Status:</strong> {selectedOrder?.orderStatus}
                </Typography>
                <Typography variant='body1'>
                    <strong>Order Date:</strong>{' '}
                    {formatDate(selectedOrder?.createdAt)}
                </Typography>
                {selectedOrder?.orderStatus === 'shipped' && (
                    <Typography variant='body1'>
                        <strong>Shipping Date:</strong>{' '}
                        {formatDate(selectedOrder?.shippingDate)}
                    </Typography>
                )}
                {selectedOrder?.orderStatus === 'delivered' && (
                    <Typography variant='body1'>
                        <strong>Delivered Date:</strong>{' '}
                        {formatDate(selectedOrder?.deliveryDate)}
                    </Typography>
                )}
                <Typography variant='body1'>
                    <strong>Total:</strong> ${selectedOrder?.total?.toFixed(2)}
                </Typography>

                {/* Order Status Tracker */}
                {selectedOrder?.orderStatus === 'Cancelled' ? (
                    <Typography variant='body1' color='error'>
                        This order has been cancelled.
                    </Typography>
                ) : (
                    <OrderStatusTracker
                        orderStatus={selectedOrder?.orderStatus}
                    />
                )}

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3,
                    }}
                >
                    {
                        // Display only if order status is pending
                        selectedOrder?.orderStatus === 'Pending' && (
                            <Button
                                variant='contained'
                                color='error'
                                onClick={() => setOrderStatus('Cancelled')}
                            >
                                Cancel
                            </Button>
                        )
                    }
                    {
                        // Display only if order status is processing
                        selectedOrder?.orderStatus === 'Processing' && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Select
                                    value={deliveryService}
                                    onChange={(e) =>
                                        setDeliveryService(e.target.value)
                                    }
                                    displayEmpty
                                    sx={{ mr: 2, width: '50%' }}
                                >
                                    <MenuItem value='' disabled>
                                        Delivery Service
                                    </MenuItem>
                                    <MenuItem value='DHL'>DHL</MenuItem>
                                    <MenuItem value='FedEx'>FedEx</MenuItem>
                                    <MenuItem value='UPS'>UPS</MenuItem>
                                </Select>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    onClick={handleAssignDelivery}
                                    disabled={!deliveryService}
                                    sx={{ width: '50%' }} // Ensure button has same width
                                >
                                    Assign to Delivery
                                </Button>
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Modal>
    );
};

// Custom styling for completed steps
const StyledStepper = styled(Stepper)({
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'transparent',
});

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const OrderStatusTracker = ({ orderStatus }) => {
    const activeStep = statusSteps.indexOf(capitalizeFirstLetter(orderStatus));
    return (
        <StyledStepper alternativeLabel activeStep={activeStep}>
            {statusSteps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </StyledStepper>
    );
};
