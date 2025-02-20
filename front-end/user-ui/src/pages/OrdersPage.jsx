import {
    AccessTime,
    AssignmentTurnedIn,
    Cancel,
    CheckCircle,
    LocalShipping,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
import Loading from '../components/Loading';
import useCancelOrder from '../hooks/useCancelOrder';
import useFetchOrders from '../hooks/useFetchOrders';
import { formatDate } from '../utils/helper';
const statusIcons = {
    pending: <AccessTime color='warning' />,
    processing: <AssignmentTurnedIn color='info' />,
    shipped: <LocalShipping color='primary' />,
    delivered: <CheckCircle color='success' />,
    cancelled: <Cancel color='error' />,
};

const OrdersPage = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('PENDING');

    const { data: orders, isLoading } = useFetchOrders({
        status: selectedTab,
    });
    const { mutate: cancelOrder, isLoading: isCanceling } = useCancelOrder();

    if (isLoading) {
        <Loading />;
    }

    console.log(orders);

    const filteredOrders = orders?.content?.filter(
        (order) => order.orderStatus === selectedTab
    );

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleCancel = async (orderId) => {
        cancelOrder({ orderId });
    };

    const handleReorder = async (order) => {
        const productItemIds = order.orderDetails.map(
            (item) => item.productItemId
        );

        const productItems = await axiosPublic.get('/products/product-items', {
            params: {
                productItemIds: productItemIds.join(','),
            },
        });

        console.log(productItems);

        const selectedCartItems = productItems.data.data.map((item) => ({
            productId: item.productId,
            productItemId: item.productItemId,
            productName: item.productName,
            quantity: order.orderDetails.find(
                (orderItem) => orderItem.productItemId === item.productItemId
            ).quantity,
            price: item.salePrice,
            color: item.color.colorName,
            imageUrl: item.productImages.find(
                (image) => image.mainImage === true
            ).imageUrl,
        }));

        console.log(selectedCartItems);

        // Save the selected item objects to local storage (optional)
        localStorage.setItem(
            'selectedCartItems',
            JSON.stringify(selectedCartItems)
        );

        // Navigate to the checkout page and pass the selected item objects as state
        navigate('/checkout', { state: { selectedCartItems } });
    };

    return (
        <Box
            sx={{
                mt: 8,
                p: 8,
                backgroundColor: '#f4f6f8',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    fontWeight='bold'
                    sx={{ textAlign: 'center' }}
                    gutterBottom
                >
                    Customer Orders
                </Typography>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor='primary'
                    indicatorColor='primary'
                    variant='fullWidth'
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 2,
                        mb: 3,
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <Tab
                        value='PENDING'
                        label='Pending'
                        icon={statusIcons.pending}
                    />
                    <Tab
                        value='PROCESSING'
                        label='Processing'
                        icon={statusIcons.processing}
                    />
                    <Tab
                        value='SHIPPED'
                        label='Shipped'
                        icon={statusIcons.shipped}
                    />
                    <Tab
                        value='DELIVERED'
                        label='Delivered'
                        icon={statusIcons.delivered}
                    />
                    <Tab
                        value='CANCELLED'
                        label='Cancelled'
                        icon={statusIcons.cancelled}
                    />
                </Tabs>

                {filteredOrders?.length === 0 && (
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        No orders found
                    </Typography>
                )}
                <Grid container spacing={3}>
                    {filteredOrders?.map((order) => (
                        <Grid item xs={12} key={order.orderId}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    {/* Order Header */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography
                                            variant='h6'
                                            fontWeight='bold'
                                        >
                                            Order #{order.orderId}
                                        </Typography>
                                        <Chip
                                            label={order.orderStatus.toUpperCase()}
                                            style={{
                                                backgroundColor: getStatusColor(
                                                    order.orderStatus
                                                ),
                                                color: 'white', // Ensure text is readable on colored backgrounds
                                                fontWeight: 'bold',
                                                textTransform: 'uppercase',
                                            }}
                                            size='small'
                                        />
                                    </Box>

                                    <Divider sx={{ mb: 2 }} />

                                    {/* Customer Details */}
                                    <Typography variant='body1' gutterBottom>
                                        Shipping Address:{' '}
                                        {order.shippingAddress}
                                    </Typography>

                                    {order.shippingDate && (
                                        <Typography
                                            variant='body2'
                                            color='textSecondary'
                                        >
                                            Shipping Date:{' '}
                                            {formatDate(order?.shippingDate)}
                                        </Typography>
                                    )}

                                    {order.deliveryDate && (
                                        <Typography
                                            variant='body2'
                                            color='textSecondary'
                                        >
                                            Delivery Date:{' '}
                                            {formatDate(order.deliveryDate)}
                                        </Typography>
                                    )}

                                    {order.cancelDate && (
                                        <Typography
                                            variant='body2'
                                            color='textSecondary'
                                        >
                                            Cancelled Date:{' '}
                                            {formatDate(order?.cancelDate)}
                                        </Typography>
                                    )}

                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        Notes: {order.notes}
                                    </Typography>

                                    {/* Order Details */}
                                    <TableContainer sx={{ mt: 2 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow
                                                    sx={{
                                                        backgroundColor:
                                                            '#f9f9f9',
                                                    }}
                                                >
                                                    <TableCell>
                                                        Product
                                                    </TableCell>
                                                    <TableCell>Color</TableCell>
                                                    <TableCell>
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order?.orderDetails?.map(
                                                    (item) => (
                                                        <TableRow
                                                            key={
                                                                item.orderDetailId
                                                            }
                                                        >
                                                            <TableCell
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    cursor: 'pointer',
                                                                }}
                                                                onClick={() =>
                                                                    window.open(
                                                                        `/products/${item.productId}`,
                                                                        '_blank'
                                                                    )
                                                                }
                                                            >
                                                                <img
                                                                    src={
                                                                        item.productImage
                                                                    }
                                                                    alt={
                                                                        item.productName
                                                                    }
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        objectFit:
                                                                            'cover',
                                                                        marginRight: 10,
                                                                    }}
                                                                />
                                                                {
                                                                    item.productName
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                {item.colorType}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.quantity}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {item.price?.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {item.total?.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    {/* Order Summary */}
                                    <Box
                                        sx={{
                                            mt: 3,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant='h6'
                                                color='primary'
                                                fontWeight='bold'
                                            >
                                                Total: ${order.total.toFixed(2)}
                                            </Typography>
                                        </Box>

                                        {/* Cancel Button (only for pending orders) */}
                                        {order.orderStatus === 'PENDING' && (
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() =>
                                                    handleCancel(order.orderId)
                                                }
                                                disabled={isCanceling}
                                            >
                                                {isCanceling
                                                    ? 'Cancelling...'
                                                    : 'Cancel Order'}
                                            </Button>
                                        )}

                                        {/* Re-order Button (only for delivered and cancelled orders) */}
                                        {(order.orderStatus === 'DELIVERED' ||
                                            order.orderStatus ===
                                                'CANCELLED') && (
                                            <Button
                                                variant='contained'
                                                color='info'
                                                onClick={() =>
                                                    handleReorder(order)
                                                }
                                            >
                                                Re-order
                                            </Button>
                                        )}

                                        {/* View Order Button */}
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            component={Link}
                                            to={`/orders/${order.orderId}`}
                                        >
                                            View Order Details
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return '#FFC107'; // Amber
        case 'processing':
            return '#17A2B8'; // Cyan
        case 'shipped':
            return '#007BFF'; // Blue
        case 'delivered':
            return '#28A745'; // Green
        case 'cancelled':
            return '#DC3545'; // Red
        default:
            return '#6C757D'; // Gray for unknown status
    }
};

export default OrdersPage;
