import { Delete as DeleteIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Popover,
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
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useFetchCart from '../hooks/useFetchCart';
import useRemoveCartItem from '../hooks/useRemoveCartItem';
import useUpdateCartItem from '../hooks/useUpdateCartItem';

function CartPage() {
    const { data: cart, isLoading, error } = useFetchCart();
    const [selectedItems, setSelectedItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (cart && cart.cartItems) {
            setSelectedItems(cart.cartItems.map((item) => item.cartItemId));
        }
    }, [cart]);

    if (isLoading) return <Loading marginTop={15} />;
    if (error) return <Error error={error} />;

    const cartItems = cart.cartItems || [];
    const totalItems = cartItems.length;

    /// Calculate total price of selected items
    const calculateTotal = () => {
        return cartItems
            .filter((item) => selectedItems.includes(item.cartItemId))
            .reduce((total, cartItem) => {
                const selectedItem = cartItem?.product?.productItems?.find(
                    (productItem) =>
                        productItem.productItemId === cartItem.productItemId
                );
                return total + selectedItem?.salePrice * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

    const handleCheckout = () => {
        // Filter selected item objects from cartItems
        const selectedCartItems = cartItems.filter((item) =>
            selectedItems.includes(item.cartItemId)
        );

        // Log selected item objects (optional)
        console.log('Selected item objects:', selectedCartItems);

        // Save the selected item objects to local storage (optional)
        localStorage.setItem(
            'selectedCartItems',
            JSON.stringify(selectedCartItems)
        );

        // Navigate to the checkout page and pass the selected item objects as state
        navigate('/checkout', { state: { selectedCartItems } });
    };

    // Handle "Select All" checkbox
    const handleSelectAll = (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            // Select all items
            setSelectedItems(cartItems.map((item) => item.cartItemId));
        } else {
            // Deselect all items
            setSelectedItems([]);
        }
    };

    // Handle individual item selection
    const handleItemSelect = (cartItemId) => (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            // Add item to selectedItems
            setSelectedItems([...selectedItems, cartItemId]);
        } else {
            // Remove item from selectedItems
            setSelectedItems(selectedItems.filter((id) => id !== cartItemId));
        }
    };

    // Determine the state of the "Select All" checkbox
    const isSelectAllChecked =
        selectedItems.length === totalItems && totalItems > 0;
    const isIndeterminate =
        selectedItems.length > 0 && selectedItems.length < totalItems;

    return (
        <Container sx={{ mt: 15 }}>
            <Typography variant='h4' align='center' gutterBottom>
                Shopping Cart
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox
                                    checked={isSelectAllChecked}
                                    indeterminate={isIndeterminate}
                                    disabled={totalItems === 0}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell align='center'>Color</TableCell>
                            <TableCell align='right'>Price</TableCell>
                            <TableCell align='right'>Quantity</TableCell>
                            <TableCell align='right'>Total</TableCell>
                            <TableCell align='center'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align='center'>
                                    Your cart is empty
                                </TableCell>
                            </TableRow>
                        ) : (
                            cartItems.map((item) => {
                                return (
                                    <CartItem
                                        cartItem={item}
                                        key={item.cartItemId}
                                        onSelect={handleItemSelect(
                                            item.cartItemId
                                        )}
                                        isSelected={selectedItems.includes(
                                            item.cartItemId
                                        )}
                                    />
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='h6'>Total</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign='right'>
                        <Typography variant='h6'>
                            ${calculateTotal()}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box display='flex' justifyContent='flex-end'>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

const CartItem = ({ cartItem, isSelected, onSelect }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen = () => {
        setAnchorEl(tableCellRef.current); // Set the TableCell as the anchor
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const tableCellRef = useRef(null);

    const selectedItem = cartItem?.product?.productItems?.find(
        (item) => item.productItemId === cartItem?.productItemId
    );

    const [tempItem, setTempItem] = useState(selectedItem);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const { mutate: updateCartItem } = useUpdateCartItem();
    const { mutate: removeCartItem } = useRemoveCartItem();

    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity);
        }
    }, [cartItem]);

    // Create a ref to store the debounced function
    const debouncedUpdateCartItem = useRef(
        debounce((id, quantity) => {
            updateCartItem({
                cartItemId: id,
                quantity: quantity,
            });
        }, 300) // 300ms debounce delay
    );

    // Cleanup debounce on component unmount
    useEffect(() => {
        // Capture the current value of debouncedUpdateCartItem.current
        const currentDebouncedFunction = debouncedUpdateCartItem.current;

        return () => {
            // Use the captured value in the cleanup function
            currentDebouncedFunction.cancel();
        };
    }, []); // No dependencies because the function is created only once

    const handleQuantityChange = (id, quantity) => {
        // Update the local quantity state immediately
        setQuantity(quantity);

        // Call the debounced function
        debouncedUpdateCartItem.current(id, quantity);
    };

    // Remove item from cart
    const handleRemoveItem = (cartItemId) => {
        // Remove the item from the cart
        console.log('Remove item with id:', cartItemId);

        // Call the removeCartItem function
        removeCartItem(cartItemId);
    };

    // Update selected color
    const handleColorChange = (newProductItem) => {
        // Update the selected product
        setTempItem(newProductItem);
    };

    const handleChangeVariants = (selectedItem) => {
        // Update the cart item with the new product item
        console.log(selectedItem);

        updateCartItem({
            cartItemId: cartItem.cartItemId,
            productItemId: selectedItem.productItemId,
        });

        // Close the popover
        handleClose();
    };

    const isOpen = Boolean(anchorEl);

    return (
        <TableRow key={cartItem.cartItemId}>
            <TableCell>
                <Checkbox checked={isSelected} onChange={onSelect} />
            </TableCell>

            <TableCell
                scope='row'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={
                        selectedItem?.productImages?.find(
                            (image) => image.mainImage
                        )?.imageUrl
                    }
                    alt={
                        selectedItem?.color?.colorName +
                        cartItem?.product?.productName
                    }
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 16,
                    }}
                />
                {selectedItem?.color?.colorName +
                    ' ' +
                    cartItem?.product?.productName}
            </TableCell>

            <TableCell align='center' ref={tableCellRef}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    {/* Display selected color */}
                    <Box
                        sx={{
                            width: 20,
                            height: 20,
                            backgroundColor: selectedItem?.color.hexCode,
                            borderRadius: '50%',
                            border: '2px solid #000',
                        }}
                    ></Box>
                    {/* Display selected color name */}
                    <Typography>{selectedItem?.color.colorName}</Typography>

                    {/* Button to open the popover */}
                    <Button onClick={handleOpen}>Change Color</Button>
                </Box>

                {/* Popover for selecting a color */}
                <Popover
                    open={isOpen}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant='h6' gutterBottom>
                            Select a Color
                        </Typography>

                        {/* Color buttons */}
                        <Stack
                            direction='row'
                            spacing={2}
                            sx={{
                                flexWrap: 'wrap',
                                gap: 1,
                                justifyContent: 'center',
                                marginTop: 2,
                            }}
                        >
                            {cartItem?.product?.productItems?.map(
                                (productItem) => (
                                    <Button
                                        key={productItem?.productItemId}
                                        variant={
                                            productItem?.productItemId ===
                                            tempItem?.productItemId
                                                ? 'contained'
                                                : 'outlined'
                                        }
                                        onClick={() =>
                                            handleColorChange(productItem)
                                        }
                                        sx={{
                                            height: 40,
                                            borderRadius: 2,
                                        }}
                                    >
                                        {productItem.color.colorName}
                                    </Button>
                                )
                            )}
                        </Stack>

                        {/* Action buttons */}
                        <Stack
                            direction='row'
                            spacing={2}
                            sx={{ justifyContent: 'center', mt: 2 }}
                        >
                            <Button variant='outlined' onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => handleChangeVariants(tempItem)}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Box>
                </Popover>
            </TableCell>

            <TableCell align='right'>
                <span
                    style={{
                        textDecoration: 'line-through',
                        color: '#999',
                    }}
                >
                    ${selectedItem?.originalPrice.toFixed(2)}
                </span>
                <br />
                <span style={{ color: '#000' }}>
                    ${selectedItem?.salePrice.toFixed(2)}
                </span>
            </TableCell>

            <TableCell align='right'>
                <TextField
                    type='number'
                    value={quantity}
                    onChange={(e) =>
                        handleQuantityChange(
                            cartItem.cartItemId,
                            e.target.value
                        )
                    }
                    size='small'
                    InputProps={{
                        inputProps: { min: 1 },
                    }}
                    sx={{ width: 100 }} // Adjust the width here to make it wider
                />
            </TableCell>

            <TableCell align='right'>
                ${(selectedItem?.salePrice * cartItem.quantity).toFixed(2)}
            </TableCell>

            <TableCell align='center'>
                <IconButton
                    color='error'
                    onClick={() => handleRemoveItem(cartItem.cartItemId)}
                    aria-label='delete'
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CartPage;
