import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useCancelOrder from '../hooks/useCancelOrder';
import useFetchOrder from '../hooks/useFetchOrder';
import { formatDate } from '../utils/helper';
const OrderDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error } = useFetchOrder(id);
    const { mutate: cancelOrder, isLoading: isCanceling } = useCancelOrder();
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    const {
        orderId,
        subtotal,
        total,
        orderStatus,
        shippingDate,
        deliveryDate,
        shippingAddress,
        shippingMethod,
        shippingCost,
        notes,
        createdAt,
        orderDetails,
    } = data;

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'warning';
            case 'PROCESSING':
                return 'info';
            case 'SHIPPED':
                return 'primary';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'error';
            default:
                return 'default';
        }
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
                padding: 8,
                backgroundColor: '#f9f9f9',
                minHeight: '100vh',
                mt: 8,
            }}
        >
            <Container maxWidth='lg'>
                {/* Back Button */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative', // Allows absolute positioning for the button
                        marginBottom: 4,
                    }}
                >
                    {/* Back Button */}
                    <Button
                        variant='outlined'
                        onClick={() => navigate('/orders')} // Navigate to the previous page
                        startIcon={<ArrowBackIcon />} // Add the left arrow icon
                        sx={{
                            position: 'absolute', // Position the button at the left
                            left: 0,
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            padding: '6px 16px',
                        }}
                    >
                        Back
                    </Button>

                    {/* Centered Title */}
                    <Typography variant='h4' fontWeight='bold'>
                        Order Details
                    </Typography>
                </Box>

                {/* Order Header Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 4,
                        backgroundColor: '#fff',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography variant='h5' fontWeight='bold'>
                        Order #{orderId}
                    </Typography>
                    <Chip
                        label={orderStatus.toUpperCase()}
                        color={getStatusColor(orderStatus)}
                        sx={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            padding: '4px 12px',
                            fontSize: '0.9rem',
                        }}
                    />
                </Box>

                <Grid container spacing={4}>
                    {/* Left Section: Order and Shipping Information */}
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                backgroundColor: '#fff',
                                padding: 3,
                                borderRadius: 2,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            {/* Order Information */}
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                gutterBottom
                            >
                                Order Details
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Created At:</strong>{' '}
                                {formatDate(createdAt)}
                            </Typography>
                            {shippingDate && (
                                <Typography variant='body1'>
                                    <strong>Shipping Date:</strong>{' '}
                                    {formatDate(shippingDate)}
                                </Typography>
                            )}

                            {deliveryDate && (
                                <Typography variant='body1'>
                                    <strong>Delivery Date:</strong>{' '}
                                    {formatDate(deliveryDate)}
                                </Typography>
                            )}

                            {orderStatus === 'cancelled' && (
                                <Typography variant='body1'>
                                    <strong>Cancelled At:</strong>{' '}
                                    {formatDate(createdAt)}
                                </Typography>
                            )}
                            <Typography variant='body1'>
                                <strong>Subtotal:</strong> $
                                {subtotal.toFixed(2)}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Total:</strong> ${total.toFixed(2)}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            {/* Shipping Information */}
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                gutterBottom
                            >
                                Shipping Information
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Address:</strong> {shippingAddress}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Method:</strong>{' '}
                                {shippingMethod.toUpperCase()}
                            </Typography>
                            <Typography variant='body1'>
                                <strong>Shipping Cost:</strong> $
                                {shippingCost.toFixed(2)}
                            </Typography>

                            {notes && (
                                <Typography variant='body1' mt={2}>
                                    <strong>Notes:</strong> {notes}
                                </Typography>
                            )}
                        </Box>
                    </Grid>

                    {/* Right Section: Order Items */}
                    <Grid item xs={12} md={8}>
                        <Box
                            sx={{
                                backgroundColor: '#fff',
                                padding: 3,
                                borderRadius: 2,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                gutterBottom
                            >
                                Order Items
                            </Typography>
                            <Box>
                                {orderDetails.map((item) => (
                                    <Box
                                        key={item.orderDetailId}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: 2,
                                            borderBottom: '1px solid #e0e0e0',
                                        }}
                                    >
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                objectFit: 'cover',
                                                borderRadius: 8,
                                                marginRight: 16,
                                            }}
                                        />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant='body1'
                                                fontWeight='bold'
                                            >
                                                {item.productName}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                            >
                                                Color: {item.colorType}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant='body2'>
                                                Quantity: {item.quantity}
                                            </Typography>
                                            <Typography variant='body2'>
                                                Price: ${item.price.toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                fontWeight='bold'
                                            >
                                                Total: ${item.total.toFixed(2)}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 2,
                            }}
                        >
                            {/* Cancel Button (only for pending orders) */}
                            {orderStatus === 'PENDING' && (
                                <Button
                                    variant='contained'
                                    color='error'
                                    onClick={() => handleCancel(orderId)}
                                    disabled={isCanceling}
                                >
                                    {isCanceling
                                        ? 'Cancelling...'
                                        : 'Cancel Order'}
                                </Button>
                            )}

                            {/* Re-order Button */}
                            {(orderStatus === 'DELIVERED' ||
                                orderStatus === 'CANCELLED') && (
                                <Button
                                    variant='contained'
                                    color='info'
                                    onClick={() => handleReorder(data)}
                                    sx={{
                                        padding: '8px 24px',
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Re-order
                                </Button>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default OrderDetailPage;
