import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Input,
    Modal,
    Rating,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useCancelOrder from '../hooks/useCancelOrder';
import useCreateFeedback from '../hooks/useCreateFeedback';
import useFetchOrder from '../hooks/useFetchOrder';
import { formatDate } from '../utils/helper';

const OrderDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error } = useFetchOrder(id);
    const { mutate: cancelOrder, isLoading: isCanceling } = useCancelOrder();
    const { mutate: createFeedback, isLoading: isCreating } =
        useCreateFeedback();
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState({});

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
        confirmDate,
        shippingDate,
        deliveryDate,
        shippingAddress,
        shippingMethod,
        shippingCost,
        notes,
        createdAt,
        orderDetails,
        payment,
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

        // Save the selected item objects to local storage (optional)
        localStorage.setItem(
            'selectedCartItems',
            JSON.stringify(selectedCartItems)
        );

        // Navigate to the checkout page and pass the selected item objects as state
        navigate('/checkout', { state: { selectedCartItems } });
    };

    const handleOpenFeedbackModal = (
        orderDetailId,
        productItemId,
        productId
    ) => {
        setSelectedItemId({
            orderDetailId,
            productItemId,
            productId,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItemId(null);
    };

    const handleSubmitFeedback = ({ rating, comment, images }) => {
        createFeedback(
            {
                rating,
                comment,
                orderDetailId: selectedItemId.orderDetailId,
                productItemId: selectedItemId.productItemId,
                productId: selectedItemId.productId,
                orderId: orderId,
                images,
            },
            {
                onSettled: () => {
                    handleClose();
                },
            }
        );
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

                {/* Order Status Tracker */}
                {
                    // Show the status tracker only if the order is not in "CANCELLED" status
                    orderStatus !== 'CANCELLED' && (
                        <OrderStatusTracker
                            orderStatus={orderStatus}
                            createdAt={createdAt}
                            confirmDate={confirmDate}
                            shippingDate={shippingDate}
                            deliveryDate={deliveryDate}
                        />
                    )
                }

                <Grid container spacing={4}>
                    {/* Left Section: Order and Shipping Information */}
                    <Grid item xs={12} md={5}>
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
                            {payment ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant='body1'>
                                        Payment Method: {payment?.paymentMethod}
                                    </Typography>
                                    <Chip
                                        label={payment?.paymentStatus}
                                        style={{
                                            backgroundColor: 'green',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                        }}
                                        size='small'
                                    />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant='body1'>
                                        Payment Method: {'COD'}
                                    </Typography>
                                    <Chip
                                        label={'UNPAID'}
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                        }}
                                        size='small'
                                    />
                                </Box>
                            )}
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
                    <Grid item xs={12} md={7}>
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
                                            borderBottom: '1px solid #e0e0e0',
                                            padding: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
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
                                                    Price: $
                                                    {item.price.toFixed(2)}
                                                </Typography>
                                                <Typography
                                                    variant='body1'
                                                    fontWeight='bold'
                                                >
                                                    Total: $
                                                    {item.total.toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Conditionally render feedback button */}
                                        {!item.feedbackGiven && (
                                            <Box
                                                sx={{
                                                    marginTop: 1,
                                                    display: 'flex',
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Typography
                                                    variant='body2'
                                                    color='textSecondary'
                                                >
                                                    You can only leave feedback
                                                    for delivered items.
                                                </Typography>

                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    onClick={() =>
                                                        handleOpenFeedbackModal(
                                                            item.orderDetailId,
                                                            item.productItemId,
                                                            item.productId
                                                        )
                                                    }
                                                    disabled={
                                                        orderStatus !==
                                                        'DELIVERED'
                                                    }
                                                >
                                                    Leave Feedback
                                                </Button>
                                            </Box>
                                        )}
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

                    <FeedbackModal
                        open={open}
                        onClose={handleClose}
                        onSubmit={handleSubmitFeedback}
                        productName={
                            orderDetails.find(
                                (item) =>
                                    item.orderDetailId ===
                                    selectedItemId?.orderDetailId
                            )?.productName
                        }
                        isCreating={isCreating}
                    />
                </Grid>
            </Container>
        </Box>
    );
};

const FeedbackModal = ({
    open,
    onClose,
    onSubmit,
    productName,
    isCreating = false,
}) => {
    const [rating, setRating] = useState(0); // State for rating value
    const [comment, setComment] = useState(''); // State for comment text
    const [images, setImages] = useState([]); // State for multiple images

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        setImages(files); // Store the selected files
    };

    const handleSubmit = () => {
        // Bundle rating, comment, and images for submission
        onSubmit({ rating, comment, images });
    };

    const handleOnclose = () => {
        onClose();
        setRating(0);
        setComment('');
        setImages([]);
    };

    return (
        <Modal
            open={open}
            onClose={handleOnclose}
            aria-labelledby='feedback-modal-title'
            aria-describedby='feedback-modal-description'
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400, // Adjust width as needed
                    bgcolor: 'white', // White background
                    borderRadius: 2, // Rounded corners
                    boxShadow: 24, // Subtle shadow for depth
                    p: 4, // Padding inside the modal
                    outline: 'none', // Remove default outline
                }}
            >
                <Typography
                    id='feedback-modal-title'
                    variant='h6'
                    component='h2'
                    sx={{ mb: 2 }}
                >
                    Rate your {productName}
                </Typography>

                {/* Star Rating Placeholder */}
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body1'>Rating:</Typography>
                    {/* Replace this with your star rating component, e.g., a library like react-rating */}
                    <Typography variant='body2' color='textSecondary'>
                        <Rating
                            name='product-rating'
                            value={rating} // Controlled value
                            onChange={(event, newValue) => {
                                setRating(newValue); // Update rating state
                            }}
                            precision={1}
                            sx={{ mt: '3px' }}
                        />
                    </Typography>
                </Box>

                {/* Comment Input */}
                <TextField
                    id='feedback-comment'
                    label='Your Feedback'
                    multiline
                    rows={4}
                    fullWidth
                    variant='outlined'
                    value={comment} // Controlled value
                    onChange={(e) => setComment(e.target.value)} // Update comment state
                    sx={{ mb: 2 }}
                />

                {/* Image Upload */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant='body1'>Upload Images:</Typography>
                    <Input
                        type='file'
                        inputProps={{ multiple: true, accept: 'image/*' }}
                        onChange={handleImageChange}
                        sx={{ width: '100%', mb: 1 }}
                    />
                    {images.length > 0 && (
                        <Typography variant='body2' sx={{ mb: 1 }}>
                            {images.length} image(s) selected
                        </Typography>
                    )}

                    {/* Image Previews */}
                    {images.length > 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Preview ${index + 1}`}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        objectFit: 'cover',
                                        borderRadius: 4,
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Submit Button */}
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth
                    onClick={handleSubmit} // Replace with actual submit logic if needed
                    disabled={!rating || isCreating} // Disable button if rating or comment is empty
                >
                    {isCreating ? 'Submitting...' : 'Submit Feedback'}
                </Button>
            </Box>
        </Modal>
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

export default OrderDetailPage;
