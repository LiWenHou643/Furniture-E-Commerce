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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCreateOrder from '../hooks/useCreateOrder';
import useFetchUserProfile from '../hooks/useFetchUserProfile';

// Import your JSON data
import citiesData from '../data/cities.json';
import districtsData from '../data/districts.json';
import wardsData from '../data/wards.json';

function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Try to get selectedCartItems from state
    const stateCartItems = location.state?.selectedCartItems;

    // Fallback to local storage if state is not available
    const localStorageCartItems =
        JSON.parse(localStorage.getItem('selectedCartItems')) || [];

    // Use stateCartItems if available, otherwise use localStorageCartItems
    const selectedCartItems = stateCartItems || localStorageCartItems;

    const { data: profileData, isLoading } = useFetchUserProfile();
    const { mutate: createOrder, isLoading: isCreatingOrder } =
        useCreateOrder();

    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        phone: '',
        address: '',
    });

    const [note, setNote] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('standard'); // Default to "standard"
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [shippingCost, setShippingCost] = useState(5.0); // Default to standard delivery fee
    const [addresses, setAddresses] = useState([]);

    const getNameFromCode = (code, data) => {
        const item = data.find((item) => item.code === code);
        return item ? item.name : 'Unknown';
    };

    const formatAddress = (address) => {
        const cityName = getNameFromCode(address.city, citiesData);
        const districtName = getNameFromCode(address.district, districtsData);
        const wardName = getNameFromCode(address.ward, wardsData);

        return {
            ...address,
            cityName: cityName,
            districtName: districtName,
            wardName: wardName,
        };
    };

    const formattedAddresses = addresses.map(formatAddress);

    useEffect(() => {
        if (profileData) {
            setAddresses(profileData.addresses);
        }
    }, [profileData]);

    useEffect(() => {
        if (formattedAddresses.length > 0) {
            const defaultAddress = formattedAddresses[0];
            const newBillingInfo = {
                fullName: profileData.lastName + ' ' + profileData.firstName,
                phone: profileData.phoneNumber,
                address: `${defaultAddress.streetAddress}, ${defaultAddress.wardName}, ${defaultAddress.districtName}, ${defaultAddress.cityName}`,
            };

            // Only update if billingInfo has changed
            if (
                JSON.stringify(newBillingInfo) !== JSON.stringify(billingInfo)
            ) {
                setBillingInfo(newBillingInfo);
            }
        }
    }, [formattedAddresses, billingInfo, profileData]); // Add formattedAddresses to the dependency array]);

    // Handle case where no data is available
    if (selectedCartItems.length === 0) {
        return (
            <div>
                <h1>Checkout</h1>
                <p>No items selected. Please go back to your cart.</p>
                <button onClick={() => navigate('/cart')}>Go to Cart</button>
            </div>
        );
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const { fullName, phone, address } = billingInfo;

    // Function to map codes to names

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    // Update this function to directly set the delivery method
    const handleDeliveryMethodChange = (method) => {
        setDeliveryMethod(method); // Directly set the selected delivery method
        setShippingCost(calculateShippingFee(method)); // Update the shipping cost
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const calculateTotalPrice = () => {
        return selectedCartItems
            .reduce((total, cartItem) => {
                const selectedItem = cartItem?.product?.productItems?.find(
                    (productItem) =>
                        productItem.productItemId === cartItem.productItemId
                );
                return total + selectedItem?.salePrice * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

    const calculateShippingFee = (method) => {
        const fee = method === 'express' ? 10.0 : 5.0;
        return fee;
    };

    const calculateTotalPayment = () => {
        return (parseFloat(calculateTotalPrice()) + shippingCost).toFixed(2);
    };

    const handleSubmitOrder = () => {
        const order = {
            shippingAddress: address,
            shippingMethod: deliveryMethod,
            paymentMethod: paymentMethod,
            shippingCost: shippingCost,
            notes: note,
            orderDetails: selectedCartItems.map((item) => {
                const selectedColor = item?.product?.productItems?.find(
                    (item) => item.productItemId === item?.productItemId
                );
                return {
                    productId: item.product.productId,
                    productItemId: item.productItemId,
                    quantity: item.quantity,
                    price: selectedColor?.salePrice,
                };
            }),
        };
        // You can now send the order to your backend
        createOrder(order);
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
                {selectedCartItems?.map((selected) => {
                    const selectedColor = selected?.product?.productItems?.find(
                        (item) => item.productItemId === selected?.productItemId
                    );
                    return (
                        <Grid
                            container
                            spacing={2}
                            key={selected.cartItemId}
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
                                        src={
                                            selectedColor?.productImages?.find(
                                                (image) =>
                                                    image.mainImage === true
                                            )?.imageUrl
                                        }
                                        alt={
                                            selectedColor?.product?.name ||
                                            'Product Image'
                                        }
                                        style={{
                                            width: 40,
                                            height: 40,
                                            objectFit: 'cover',
                                            marginRight: 10,
                                        }}
                                    />
                                    <Typography variant='body2'>
                                        {selected?.product?.productName}
                                        {' - '}
                                        {selectedColor?.color?.colorName}
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
                                    ${selectedColor?.salePrice?.toFixed(2)}
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
                                    {selected.quantity}
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
                                        selectedColor.salePrice *
                                        selected.quantity
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
                            ${calculateTotalPayment()}
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
                            ${shippingCost.toFixed(2)}
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
                        disabled={isCreatingOrder}
                    >
                        {isCreatingOrder ? 'Processing...' : 'Place Order'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default CheckoutPage;
