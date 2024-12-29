import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

function CheckoutPage({ cartItems = [], userData }) {
    cartItems = [
        {
            id: 1,
            name: 'Smartphone Model X',
            colors: [
                {
                    name: 'Black',
                    originalPrice: 500.0,
                    discountedPrice: 450.0,
                    image: '/images/smartphone-black.jpg',
                },
                {
                    name: 'White',
                    originalPrice: 500.0,
                    discountedPrice: 460.0,
                    image: '/images/smartphone-white.jpg',
                },
            ],
            selectedColor: 'Black',
            quantity: 2,
        },
        {
            id: 2,
            name: 'Wireless Headphones Pro',
            colors: [
                {
                    name: 'Black',
                    originalPrice: 150.0,
                    discountedPrice: 120.0,
                    image: '/images/headphones-black.jpg',
                },
                {
                    name: 'White',
                    originalPrice: 150.0,
                    discountedPrice: 130.0,
                    image: '/images/headphones-white.jpg',
                },
            ],
            selectedColor: 'White',
            quantity: 1,
        },
        {
            id: 3,
            name: 'Laptop Pro 15',
            colors: [
                {
                    name: 'Gray',
                    originalPrice: 1200.0,
                    discountedPrice: 1100.0,
                    image: '/images/laptop-gray.jpg',
                },
                {
                    name: 'Silver',
                    originalPrice: 1200.0,
                    discountedPrice: 1150.0,
                    image: '/images/laptop-silver.jpg',
                },
            ],
            selectedColor: 'Silver',
            quantity: 1,
        },
        {
            id: 4,
            name: 'Smartwatch 2.0',
            colors: [
                {
                    name: 'Black',
                    originalPrice: 200.0,
                    discountedPrice: 180.0,
                    image: '/images/smartwatch-black.jpg',
                },
                {
                    name: 'Red',
                    originalPrice: 200.0,
                    discountedPrice: 190.0,
                    image: '/images/smartwatch-red.jpg',
                },
            ],
            selectedColor: 'Red',
            quantity: 1,
        },
    ];

    const [billingInfo] = useState({
        fullName: userData?.fullName || 'Tester',
        phone: userData?.phone || '000111222',
        address: userData?.address || 'abc DDD ZZZ',
    });

    const { fullName, phone, address } = billingInfo;

    const [note, setNote] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('standard'); // Default to "standard"
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    // Update this function to directly set the delivery method
    const handleDeliveryMethodChange = (method) => {
        setDeliveryMethod(method); // Directly set the selected delivery method
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const calculateTotalPrice = () => {
        return cartItems
            .reduce((total, item) => {
                const selectedColor = item.colors.find(
                    (color) => color.name === item.selectedColor
                );
                return total + selectedColor.discountedPrice * item.quantity;
            }, 0)
            .toFixed(2);
    };

    const calculateShippingFee = () => {
        return deliveryMethod === 'express' ? 10.0 : 5.0; // Change fee based on delivery method
    };

    const calculateTotalPayment = () => {
        return (
            parseFloat(calculateTotalPrice()) + calculateShippingFee()
        ).toFixed(2);
    };

    const handleSubmitOrder = () => {
        alert('Order placed successfully!');
        // In a real app, you would call a backend API to process the payment and order.
    };

    return (
        <Container sx={{ mt: 15 }}>
            <Typography variant='h4' gutterBottom>
                Checkout
            </Typography>

            {/* Delivery Address Row */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant='h6' gutterBottom>
                    Delivery Address
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='body1'>
                            <strong>Full Name:</strong> {fullName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='body1'>
                            <strong>Phone:</strong> {phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant='body1'>
                            <strong>Full Address:</strong> {address}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Order Summary Table */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant='h6' gutterBottom>
                    Order Summary
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Typography variant='body1'>Product Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='body1'>Unit Price</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1'>Quantity</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant='body1'>Total</Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 1 }} />
                {cartItems.map((item) => {
                    const selectedColor = item.colors.find(
                        (color) => color.name === item.selectedColor
                    );
                    return (
                        <Grid
                            container
                            spacing={2}
                            key={item.id}
                            sx={{ mb: 1 }}
                            alignItems='center'
                        >
                            {/* Product Name with Placeholder Image */}
                            <Grid
                                item
                                xs={5}
                                container
                                alignItems='center'
                                textAlign='center'
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img
                                        src='https://placeholder.com/100' // Placeholder image
                                        alt={item.name}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            objectFit: 'cover',
                                            marginRight: 10,
                                        }}
                                    />
                                    <Typography variant='body2'>
                                        {item.name}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid
                                item
                                xs={3}
                                container
                                alignItems='center'
                                textAlign='center'
                            >
                                <Typography variant='body2'>
                                    ${selectedColor.discountedPrice.toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                container
                                alignItems='center'
                                textAlign='center'
                            >
                                <Typography variant='body2'>
                                    {item.quantity}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                container
                                alignItems='center'
                                textAlign='center'
                            >
                                <Typography variant='body2'>
                                    $
                                    {(
                                        selectedColor.discountedPrice *
                                        item.quantity
                                    ).toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Paper>

            {/* Note for Shop & Delivery Method */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label='Note for the shop'
                            value={note}
                            onChange={handleNoteChange}
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Delivery Method</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    <strong>Delivery Method:</strong>
                                </Typography>
                            </Grid>

                            {/* Standard Delivery Button */}
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant={
                                        deliveryMethod === 'standard'
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() =>
                                        handleDeliveryMethodChange('standard')
                                    }
                                >
                                    Standard Delivery
                                </Button>
                            </Grid>

                            {/* Express Delivery Button */}
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant={
                                        deliveryMethod === 'express'
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() =>
                                        handleDeliveryMethodChange('express')
                                    }
                                >
                                    Express Delivery
                                </Button>
                            </Grid>

                            {/* Display Standard Delivery Info */}
                            {deliveryMethod === 'standard' && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        <strong>Standard Delivery</strong>: 5-7
                                        days
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        <strong>Estimated Fee:</strong> $
                                        {calculateShippingFee('standard')}
                                    </Typography>
                                </Grid>
                            )}

                            {/* Display Express Delivery Info */}
                            {deliveryMethod === 'express' && (
                                <Grid item xs={12}>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        <strong>Express Delivery</strong>: 3-5
                                        days
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        <strong>Estimated Fee:</strong> $
                                        {calculateShippingFee('express')}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Total Money */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Total Price</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign='right'>
                        <Typography variant='h6'>
                            ${calculateTotalPrice()}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Payment Method */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Typography variant='h6' gutterBottom>
                    Payment Method
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant={
                                paymentMethod === 'cod'
                                    ? 'contained'
                                    : 'outlined'
                            }
                            onClick={() => handlePaymentMethodChange('cod')}
                        >
                            Cash on Delivery
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant={
                                paymentMethod === 'paypal'
                                    ? 'contained'
                                    : 'outlined'
                            }
                            onClick={() => handlePaymentMethodChange('paypal')}
                        >
                            PayPal
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Final Order Summary */}
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant='body1'>Total Products</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign='right'>
                        <Typography variant='body1'>
                            ${calculateTotalPrice()}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant='body1'>Shipping Fee</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign='right'>
                        <Typography variant='body1'>
                            ${calculateShippingFee().toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography variant='body1'>Total Payment</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign='right'>
                        <Typography variant='body1'>
                            ${calculateTotalPayment()}
                        </Typography>
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='flex-end' mt={3}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleSubmitOrder}
                        size='large'
                    >
                        Make Order
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default CheckoutPage;
