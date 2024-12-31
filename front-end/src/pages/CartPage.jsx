import { Delete as DeleteIcon } from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useFetchCart from '../hooks/useFetchCart';

function CartPage() {
    const { data: cart, isLoading, error } = useFetchCart();
    if (isLoading) return <Loading />;
    if (error) return <Error error={error} />;

    const cartItems = cart?.cartItems || [];

    // Calculate total price
    const calculateTotal = () => {
        return cartItems
            .reduce((total, cartItem) => {
                const selectedItem = cartItem?.product?.productItems?.find(
                    (productItem) =>
                        productItem.productItemId === cartItem.productItemId
                );
                return total + selectedItem?.salePrice * cartItem.quantity;
            }, 0)
            .toFixed(2);
    };

    return (
        <Container sx={{ mt: 15 }}>
            <Typography variant='h4' align='center' gutterBottom>
                Shopping Cart
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align='right'>Price</TableCell>
                            <TableCell align='right'>Quantity</TableCell>
                            <TableCell align='right'>Total</TableCell>
                            <TableCell align='center'>Color</TableCell>
                            <TableCell align='center'>Actions</TableCell>
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
                    <Button variant='contained' color='primary' size='large'>
                        Checkout
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

const CartItem = ({ cartItem }) => {
    const selectedItem = cartItem?.product?.productItems?.find(
        (item) => item.productItemId === cartItem?.productItemId
    );

    console.log(selectedItem);

    const handleQuantityChange = (id, quantity) => {};

    // Remove item from cart
    const handleRemoveItem = (id) => {};

    // Update selected color
    const handleColorChange = (id, color) => {};

    return (
        <TableRow key={cartItem.cartItemId}>
            <TableCell
                component='th'
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
                    cartItem?.product?.productName}
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
                    value={cartItem.quantity}
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
                <FormControl size='small' sx={{ width: 120 }}>
                    <InputLabel>Color</InputLabel>
                    <Select
                        value={cartItem.selectedColor}
                        onChange={(e) =>
                            handleColorChange(cartItem.id, e.target.value)
                        }
                        label='Color'
                    >
                        {cartItem?.colors?.map((color, index) => (
                            <MenuItem key={index} value={color.name}>
                                {color.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align='center'>
                <IconButton
                    color='error'
                    onClick={() => handleRemoveItem(cartItem.id)}
                    aria-label='delete'
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CartPage;
