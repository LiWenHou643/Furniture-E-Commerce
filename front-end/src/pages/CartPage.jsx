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
import { useState } from 'react';

const initialCartItems = [
    {
        id: 1,
        name: 'Product 1',
        quantity: 1,
        colors: [
            {
                name: 'Red',
                originalPrice: 39.99,
                discountedPrice: 29.99,
                image: 'https://via.placeholder.com/50/ff0000',
            },
            {
                name: 'Blue',
                originalPrice: 42.99,
                discountedPrice: 32.99,
                image: 'https://via.placeholder.com/50/0000ff',
            },
            {
                name: 'Green',
                originalPrice: 37.99,
                discountedPrice: 27.99,
                image: 'https://via.placeholder.com/50/00ff00',
            },
        ],
        selectedColor: 'Red',
    },
    {
        id: 2,
        name: 'Product 2',
        quantity: 2,
        colors: [
            {
                name: 'Black',
                originalPrice: 79.99,
                discountedPrice: 59.99,
                image: 'https://via.placeholder.com/50/000000',
            },
            {
                name: 'White',
                originalPrice: 82.99,
                discountedPrice: 62.99,
                image: 'https://via.placeholder.com/50/ffffff',
            },
            {
                name: 'Gray',
                originalPrice: 75.99,
                discountedPrice: 55.99,
                image: 'https://via.placeholder.com/50/808080',
            },
        ],
        selectedColor: 'Black',
    },
    {
        id: 3,
        name: 'Product 3',
        quantity: 1,
        colors: [
            {
                name: 'Yellow',
                originalPrice: 29.99,
                discountedPrice: 19.99,
                image: 'https://via.placeholder.com/50/ffff00',
            },
            {
                name: 'Purple',
                originalPrice: 31.99,
                discountedPrice: 21.99,
                image: 'https://via.placeholder.com/50/800080',
            },
            {
                name: 'Pink',
                originalPrice: 28.99,
                discountedPrice: 18.99,
                image: 'https://via.placeholder.com/50/ff69b4',
            },
        ],
        selectedColor: 'Yellow',
    },
];

function CartPage() {
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Update quantity
    const handleQuantityChange = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: parseInt(quantity) || 0 }
                    : item
            )
        );
    };

    // Remove item from cart
    const handleRemoveItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Update selected color
    const handleColorChange = (id, color) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, selectedColor: color } : item
            )
        );
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => {
                const selectedItem = item.colors.find(
                    (color) => color.name === item.selectedColor
                );
                return total + selectedItem.discountedPrice * item.quantity;
            }, 0)
            .toFixed(2);
    };

    return (
        <Container sx={{ mt: 10 }}>
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
                        {cartItems.map((item) => {
                            const selectedColor = item.colors.find(
                                (color) => color.name === item.selectedColor
                            );
                            return (
                                <TableRow key={item.id}>
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img
                                            src={selectedColor.image}
                                            alt={item.selectedColor}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                marginRight: 16,
                                            }}
                                        />
                                        {item.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <span
                                            style={{
                                                textDecoration: 'line-through',
                                                color: '#999',
                                            }}
                                        >
                                            $
                                            {selectedColor.originalPrice.toFixed(
                                                2
                                            )}
                                        </span>
                                        <br />
                                        <span style={{ color: '#000' }}>
                                            $
                                            {selectedColor.discountedPrice.toFixed(
                                                2
                                            )}
                                        </span>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <TextField
                                            type='number'
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
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
                                        $
                                        {(
                                            selectedColor.discountedPrice *
                                            item.quantity
                                        ).toFixed(2)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <FormControl
                                            size='small'
                                            sx={{ width: 120 }}
                                        >
                                            <InputLabel>Color</InputLabel>
                                            <Select
                                                value={item.selectedColor}
                                                onChange={(e) =>
                                                    handleColorChange(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                label='Color'
                                            >
                                                {item.colors.map(
                                                    (color, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={color.name}
                                                        >
                                                            {color.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <IconButton
                                            color='error'
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                            aria-label='delete'
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
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

export default CartPage;
