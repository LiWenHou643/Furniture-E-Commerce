import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
// import { formatDate } from '../utils/helper';
import { styled } from '@mui/system';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchOrder from '../hooks/useFetchOrder';

const StyledCard = styled(Card)({
    padding: '20px',
    marginBottom: '20px',
});

const OrderDetails = () => {
    const { orderId } = useParams();
    const [deliveryService, setDeliveryService] = useState('');
    const [orderStatus, setOrderStatus] = useState('Pending');
    const { data: order, isLoading } = useFetchOrder(orderId);
    const [editing, setEditing] = useState(false);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    const handleConfirmOrder = () => {
        // Logic to confirm the order
        // Update order status and trigger necessary processes
    };

    const handleAssignDelivery = () => {
        // Logic to assign the order to a delivery service
        // Send order details to the selected delivery service
    };

    const handleStatusChange = (event) => {};

    const handleSave = () => {
        setEditing(false);
        // Here, you can integrate API call to update order status
        console.log('Updated Order:', order);
    };
    return (
        <Box>
            <StyledCard>
                <CardContent>
                    <Typography variant='h6'>Order Details</Typography>
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        <Grid item xs={6}>
                            <Typography variant='body1'>
                                <strong>Order ID:</strong> {order.orderId}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>Shipping Address:</strong>{' '}
                                {order.shippingAddress}
                            </Typography>

                            <Box
                                variant='body1'
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                }}
                            >
                                <Typography>
                                    <strong>Order Status:</strong>
                                </Typography>
                                <OrderStatus status={order.orderStatus} />
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body1'>
                                <strong>Subtotal:</strong> ${order.subtotal}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Shipping Cost:</strong> $
                                {order.shippingCost}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Total:</strong> ${order.total}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Order Status Tracker */}
                    <OrderStatusTracker orderStatus={order.orderStatus} />
                </CardContent>
            </StyledCard>

            {/* Order Items Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderDetails.map((item) => (
                            <TableRow key={item.orderDetailId}>
                                <TableCell>
                                    <Avatar
                                        src={item.productImage}
                                        alt={item.productName}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            marginRight: 2,
                                        }}
                                    />
                                    {item.productName}
                                </TableCell>
                                <TableCell>{item.colorType}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>${item.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
// Status Mapping for Progress Bar
const statusSteps = ['Pending', 'Processing', 'Shipped', 'Delivered'];

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

export default OrderDetails;
