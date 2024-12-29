import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Rating,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import ImageMagnifier from '../components/ImageMagnifier';
const ProductDetailPage = () => {
    const theme = useTheme();

    const product = {
        id: 1,
        title: 'Modern Leather Jacket',
        description: 'A stylish leather jacket perfect for any occasion.',
        colorVariants: [
            {
                color: 'Black',
                hex: '#000000',
                images: [
                    'https://placehold.co/100',
                    'https://placehold.co/200',
                    'https://placehold.co/300',
                ],
                originalPrice: 149.99,
                discountedPrice: 129.99,
            },
            {
                color: 'Brown',
                hex: '#8B4513',
                images: [
                    'https://placehold.co/400', // Different image set for Brown
                    'https://placehold.co/500',
                    'https://placehold.co/600',
                ],
                originalPrice: 159.99,
                discountedPrice: 139.99,
            },
            {
                color: 'Red',
                hex: '#FF0000',
                images: [
                    'https://placehold.co/700', // Different image set for Red
                    'https://placehold.co/800',
                    'https://placehold.co/900',
                ],
                originalPrice: 169.99,
                discountedPrice: 149.99,
            },
        ],
        rating: 4.5,
    };
    const feedbacks = [
        {
            name: 'John Doe',
            date: 'December 15, 2024',
            rating: 4.5,
            feedback:
                'Great product! Really helped me in organizing my workspace. Would definitely recommend.',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            productImages: [
                'https://via.placeholder.com/100', // Product image URL
                'https://via.placeholder.com/100', // Another product image
            ],
        },
        {
            name: 'Jane Smith',
            date: 'December 20, 2024',
            rating: 3.0,
            feedback:
                'The product is good but a bit overpriced. It could use some improvements in durability.',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            productImages: ['https://via.placeholder.com/100'],
        },
        {
            name: 'Alice Johnson',
            date: 'December 25, 2024',
            rating: 5.0,
            feedback:
                'Amazing quality! Exceeded my expectations. I am so happy with this purchase!',
            avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
            productImages: [
                'https://via.placeholder.com/100',
                'https://via.placeholder.com/100',
                'https://via.placeholder.com/100',
            ],
        },
    ];
    const topProducts = [
        { name: 'Product 1', price: '$100' },
        { name: 'Product 2', price: '$120' },
        { name: 'Product 3', price: '$90' },
        { name: 'Product 4', price: '$200' },
    ];

    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    const ratingCount = 100;
    const soldQuantity = 50;
    const stockQuantity = 100;

    const handleIncrease = () => {
        if (quantity < stockQuantity) {
            setQuantity((prevQuantity) => prevQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 1 && value <= stockQuantity) {
            setQuantity(value);
        }
    };

    const { title, description, colorVariants, rating } = product;

    // State to track the selected color variant and image
    const [selectedColor, setSelectedColor] = useState(colorVariants[0]);
    const [selectedImage, setSelectedImage] = useState(
        colorVariants[0].images[0]
    );

    // Handle small image click to change the main image
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // Handle color selection
    const handleColorSelect = (color) => {
        const colorVariant = colorVariants.find(
            (variant) => variant.color === color
        );
        setSelectedColor(colorVariant);
        setSelectedImage(colorVariant.images[0]); // Reset to the first image for the new color
    };

    // Navigate to cart or other page
    const handleAddToCart = () => {
        // Logic to add the product to the cart
        console.log('Product added to cart');
    };

    return (
        <Container>
            <Box sx={{ padding: 4, marginTop: 10 }}>
                <Grid container spacing={4}>
                    {/* Product Images */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            {/* ReactImageMagnify Zoom Component */}
                            <ImageMagnifier
                                src={selectedImage}
                                magnifierHeight={300}
                                magnifierWidth={300}
                                zoomLevel={2}
                                alt='Product Image'
                            />
                        </Box>

                        {/* Thumbnails for Color Variants */}
                        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                            {selectedColor.images.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component='img'
                                    image={img}
                                    alt={`product-image-${index}`}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        cursor: 'pointer',
                                        border:
                                            selectedImage === img
                                                ? `2px solid ${theme.palette.primary.main}` // Use primary color from theme
                                                : '1px solid #ddd',
                                        borderRadius: 1,
                                        transition: 'transform 0.3s ease', // Smooth transition for scaling
                                        transform:
                                            selectedImage === img
                                                ? 'scale(1.1)'
                                                : 'scale(1)', // Slightly enlarge selected image
                                        '&:hover': {
                                            borderColor:
                                                theme.palette.primary.main, // Use primary color on hover
                                            transform: 'scale(1.1)', // Scale up on hover
                                        },
                                    }}
                                    onClick={() => handleImageClick(img)} // Change image on click
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant='h4' gutterBottom>
                                    {title}
                                </Typography>

                                {/* Rating and Rating Count */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating
                                        value={rating}
                                        readOnly
                                        precision={0.1}
                                        sx={{ marginRight: 1 }}
                                    />
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        ({ratingCount} ratings)
                                    </Typography>
                                </Box>

                                {/* Description */}
                                <Typography
                                    variant='body1'
                                    color='text.secondary'
                                    paragraph
                                >
                                    {description}
                                </Typography>

                                {/* Pricing */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                    }}
                                >
                                    <Typography variant='h6' color='primary'>
                                        $
                                        {selectedColor.discountedPrice.toFixed(
                                            2
                                        )}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        $
                                        {selectedColor.originalPrice.toFixed(2)}
                                    </Typography>
                                </Box>

                                {/* Sold Quantity */}
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{ mt: 2 }}
                                >
                                    {soldQuantity} units sold
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Color Selection */}
                                <Typography variant='body1' gutterBottom>
                                    Select Color:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                    {colorVariants.map((variant) => (
                                        <Box
                                            key={variant.color}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: '50%',
                                                backgroundColor: variant.hex,
                                                cursor: 'pointer',
                                                border:
                                                    selectedColor.color ===
                                                    variant.color
                                                        ? '2px solid black'
                                                        : 'none',
                                                '&:hover': {
                                                    borderColor: 'primary.main',
                                                },
                                            }}
                                            onClick={() =>
                                                handleColorSelect(variant.color)
                                            } // Handle color selection
                                        />
                                    ))}
                                </Box>

                                {/* Quantity Selection */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 2,
                                        gap: 2,
                                    }}
                                >
                                    <IconButton
                                        onClick={handleDecrease}
                                        disabled={quantity <= 1} // Disable decrease button if quantity is 1
                                        sx={{
                                            backgroundColor:
                                                'background.default',
                                        }}
                                    >
                                        <RemoveIcon />
                                    </IconButton>

                                    <TextField
                                        value={quantity}
                                        onChange={handleChange}
                                        type='number'
                                        inputProps={{
                                            min: 1,
                                            max: stockQuantity,
                                            style: {
                                                // Disable the number input's spinner (up and down arrows)
                                                MozAppearance: 'textfield',
                                                WebkitAppearance: 'none',
                                                appearance: 'none',
                                                textAlign: 'center', // Optional: to center the number inside the field
                                            },
                                        }}
                                        sx={{ width: 80 }}
                                        variant='outlined'
                                        size='small'
                                    />

                                    <IconButton
                                        onClick={handleIncrease}
                                        disabled={quantity >= stockQuantity} // Disable increase button if stock is reached
                                        sx={{
                                            backgroundColor:
                                                'background.default',
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>

                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {`Stock Left: ${
                                            stockQuantity - quantity
                                        }`}
                                    </Typography>
                                </Box>

                                {/* Add to Cart & Wishlist Buttons */}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        fullWidth
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        fullWidth
                                        onClick={() =>
                                            console.log('Added to wishlist')
                                        }
                                    >
                                        Add to Wishlist
                                    </Button>
                                </Box>

                                {/* Delivery & Agreement Policy */}
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant='h6' gutterBottom>
                                        Delivery & Return Policy
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        <strong>Delivery:</strong> Ships within
                                        2-3 business days.
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        <strong>Return Policy:</strong> You can
                                        return the product within 15 days for a
                                        full refund.
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        <strong>Money-back Guarantee:</strong>
                                        30-day money-back guarantee if
                                        you&apos;re not satisfied.
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={9}>
                    <Box sx={{ maxWidth: '800px' }}>
                        <Typography variant='h5' gutterBottom>
                            Customer Feedbacks
                        </Typography>
                        <List>
                            {feedbacks.map((feedback, index) => (
                                <Box key={index}>
                                    <ListItem
                                        alignItems='flex-start'
                                        sx={{ width: '100%' }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={feedback.name}
                                                src={feedback.avatar}
                                            />
                                        </ListItemAvatar>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: '100%',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <Typography
                                                    variant='body1'
                                                    fontWeight='bold'
                                                >
                                                    {feedback.name}
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    color='text.secondary'
                                                >
                                                    {feedback.date}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Rating
                                                    value={feedback.rating}
                                                    readOnly
                                                    precision={0.1}
                                                />
                                                <Typography
                                                    variant='body2'
                                                    color='text.secondary'
                                                    sx={{ mt: 1 }}
                                                >
                                                    {feedback.feedback}
                                                </Typography>

                                                {/* Product Images */}
                                                {feedback.productImages.length >
                                                    0 && (
                                                    <Grid
                                                        container
                                                        sx={{ mt: 2 }}
                                                    >
                                                        {feedback.productImages.map(
                                                            (
                                                                image,
                                                                imageIndex
                                                            ) => (
                                                                <Grid
                                                                    item
                                                                    xs={2}
                                                                    key={
                                                                        imageIndex
                                                                    }
                                                                >
                                                                    <CardMedia
                                                                        component='img'
                                                                        image={
                                                                            image
                                                                        }
                                                                        alt={`Product Image ${
                                                                            imageIndex +
                                                                            1
                                                                        }`}
                                                                        sx={{
                                                                            width: '100px',
                                                                            height: 'auto',
                                                                            objectFit:
                                                                                'contain',
                                                                            borderRadius: 1,
                                                                            boxShadow: 2,
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            )
                                                        )}
                                                    </Grid>
                                                )}
                                            </Box>
                                        </Box>
                                    </ListItem>
                                    {index < feedbacks.length - 1 && (
                                        <Divider />
                                    )}
                                </Box>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <Box sx={{ width: 300, padding: 2 }}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant='h6' gutterBottom>
                                Top Products
                            </Typography>
                            <List>
                                {topProducts.map((product, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={product.name}
                                            secondary={product.price}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetailPage;
