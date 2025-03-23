import CheckIcon from '@mui/icons-material/Check';
import {
    Avatar,
    Box,
    Button,
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
import { styled } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useConfirmOrder from '../hooks/useConfirmOrder';
import useFetchOrder from '../hooks/useFetchOrder';
import { formatDate } from '../utils/helper';

const StyledCard = styled(Card)({
    padding: '20px',
    marginBottom: '20px',
});

const OrderDetails = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [deliveryService, setDeliveryService] = useState('');
    const [orderStatus, setOrderStatus] = useState('PENDING');
    const { data: order, isLoading } = useFetchOrder(orderId);
    const [editing, setEditing] = useState(false);
    const { mutate: confirmOrder } = useConfirmOrder();

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    const handleConfirmOrder = () => {
        confirmOrder(orderId);
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
        <Box sx={{ padding: 2 }}>
            <Button
                variant='contained'
                color='secondary'
                onClick={() => navigate('/orders-management')}
                sx={{ marginBottom: 2 }}
            >
                Go Back
            </Button>

            <StyledCard>
                <CardContent>
                    <Grid container spacing={2} sx={{ marginTop: 0 }}>
                        <Grid item xs={6}>
                            <Typography variant='body1'>
                                <strong>Order ID:</strong> {order.orderId}
                            </Typography>

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

                                {/* Show Button actions match with order status */}
                                {order.orderStatus === 'PENDING' ? (
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleConfirmOrder}
                                    >
                                        Confirm Order
                                    </Button>
                                ) : order.orderStatus === 'PROCESSING' ? (
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => setEditing(true)}
                                    >
                                        Assign Delivery
                                    </Button>
                                ) : null}
                            </Box>

                            {/* Show the status dropdown only if the order is not in "CANCELLED" status */}
                            {order.orderStatus === 'CANCELLED' && (
                                <Typography variant='body1'>
                                    <strong>Cancelled Date:</strong>
                                    {formatDate(order.cancelDate)}
                                </Typography>
                            )}
                        </Grid>

                        <Grid item xs={6}>
                            <Typography variant='body1'>
                                <strong>Customer:</strong> {order.userName}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>Phone:</strong> {order.userPhone}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>Email:</strong> {order.userEmail}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>Shipping Address:</strong>{' '}
                                {order.shippingAddress}
                            </Typography>

                            <Typography variant='body1'>
                                <strong>Shipping Method:</strong>{' '}
                                {order.shippingMethod}
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Order Status Tracker */}
                    {
                        // Show the status tracker only if the order is not in "CANCELLED" status
                        order.orderStatus !== 'CANCELLED' && (
                            <OrderStatusTracker
                                orderStatus={order?.orderStatus}
                                createdAt={order?.createdAt}
                                confirmDate={order?.confirmDate}
                                shippingDate={order?.shippingDate}
                                deliveryDate={order?.deliveryDate}
                            />
                        )
                    }
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            alignItems: 'center',
                                        }}
                                    >
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
                                    </Box>
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
const statusSteps = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

// Custom styling for completed steps
const StyledStepper = styled(Stepper)({
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'transparent',
});

const OrderStatusTracker = ({
    orderStatus,
    createdAt,
    confirmDate,
    shippingDate,
    deliveryDate,
}) => {
    const activeStep = statusSteps.indexOf(orderStatus);

    return (
        <StyledStepper alternativeLabel activeStep={activeStep}>
            {statusSteps.map((label, index) => (
                <Step key={label}>
                    <StepLabel
                        icon={
                            index < activeStep ? (
                                <div
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        backgroundColor: 'green',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckIcon
                                        style={{ color: 'white', fontSize: 16 }}
                                    />
                                </div>
                            ) : index === activeStep ? (
                                <div
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        backgroundColor: 'green',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <CheckIcon
                                        style={{ color: 'white', fontSize: 16 }}
                                    />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        backgroundColor: 'gray',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontFamily: 'Arial',
                                        fontSize: 12,
                                    }}
                                >
                                    {index + 1}
                                </div>
                            )
                        }
                    >
                        <Typography variant='body1'>{label}</Typography>

                        {label === 'PENDING' ? (
                            <Typography variant='caption'>
                                {formatDate(createdAt)}
                            </Typography>
                        ) : label === 'PROCESSING' ? (
                            <Typography variant='caption'>
                                {formatDate(confirmDate)}
                            </Typography>
                        ) : label === 'SHIPPED' ? (
                            <Typography variant='caption'>
                                {formatDate(shippingDate)}
                            </Typography>
                        ) : label === 'DELIVERED' ? (
                            <Typography variant='caption'>
                                {formatDate(deliveryDate)}
                            </Typography>
                        ) : null}
                    </StepLabel>
                </Step>
            ))}
        </StyledStepper>
    );
};

const OrderStatus = ({ status }) => {
    const statusMap = {
        PENDING: { label: 'PENDING', color: 'warning' },
        PROCESSING: { label: 'PROCESSING', color: 'info' },
        SHIPPED: { label: 'SHIPPED', color: 'success' },
        DELIVERED: { label: 'DELIVERED', color: 'success' },
        CANCELLED: { label: 'CANCELLED', color: 'error' },
    };

    return (
        <Chip
            label={statusMap[status]?.label || 'Unknown'}
            color={statusMap[status]?.color || 'default'} // Fallback to "default" if status is not found
        />
    );
};

export default OrderDetails;
