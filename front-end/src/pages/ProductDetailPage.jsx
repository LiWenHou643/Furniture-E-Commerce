import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomTooltip from '../components/CustomTooltip';
import Error from '../components/Error';
import ImageMagnifier from '../components/ImageMagnifier';
import Loading from '../components/Loading';
import useAddToCart from '../hooks/useAddToCart';
import useFetchProduct from '../hooks/useFetchProduct';

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

const ProductDetailPage = () => {
    const theme = useTheme();
    const [selectedVariant, setSelectedVariant] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [quantity, setQuantity] = useState(1); // Default quantity is 1

    // Fetch product data using the custom hook
    const { productId } = useParams();
    const { data: product, isLoading, error } = useFetchProduct({ productId });
    const { mutate: addToCart, isLoading: isAdding } = useAddToCart();

    // Destructure the product object
    useEffect(() => {
        if (product) {
            const defaultVariant = product?.productItems[0];
            setSelectedVariant(defaultVariant);
            setSelectedImage(defaultVariant?.productImages[0]);
        }
    }, [product]);

    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <Error error={error} />;
    }

    const productItemsObject = product;

    const productVariants = productItemsObject?.productItems;

    // State to track the selected color variant and image

    const stockQuantity = 100;

    const handleIncrease = () => {
        if (quantity < selectedVariant?.stockQuantity) {
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

    // Handle small image click to change the main image
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    // Handle color selection
    const handleColorSelect = (colorId) => {
        const colorVariant = productVariants.find(
            (variant) => variant?.color.colorId === colorId
        );
        setSelectedVariant(colorVariant);
        setSelectedImage(colorVariant?.productImages[0]); // Reset to the first image for the new color
    };

    // Navigate to cart or other page
    const handleAddToCart = () => {
        // Logic to add the product to the cart
        console.log('Product added to cart');
        addToCart({
            productItemId: selectedVariant?.productItemId,
            quantity: quantity,
        });
    };

    return (
        <Container sx={{ mt: 15 }}>
            <Box sx={{ padding: 4 }}>
                <Grid container spacing={4}>
                    {/* Product Images */}
                    <Grid item xs={12} sm={12} md={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%', // Container width
                                position: 'relative',
                                aspectRatio: '4 / 3', // Set the desired aspect ratio (e.g., 16:9)
                                overflow: 'hidden', // Clip the content if necessary
                            }}
                        >
                            {/* ReactImageMagnify Zoom Component */}
                            <ImageMagnifier
                                src={selectedImage?.imageUrl}
                                magnifierHeight={300}
                                magnifierWidth={300}
                                zoomLevel={1.3}
                                alt='Product Image'
                                width='100%' // Pass width and height explicitly if required
                                height='100%'
                            />
                        </Box>

                        {/* Thumbnails for Color Variants */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                marginTop: 2,
                            }}
                        >
                            {selectedVariant?.productImages.map(
                                (img, index) => (
                                    <CardMedia
                                        key={index}
                                        component='img'
                                        image={img?.imageUrl}
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
                                )
                            )}
                        </Box>
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} sm={12} md={6}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant='h4' gutterBottom>
                                    {selectedVariant?.color.colorName +
                                        product.productName}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    gutterBottom
                                >
                                    SKU: {selectedVariant?.sku}
                                </Typography>

                                {/* Rating and Rating Count and Sold Amount */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{
                                            textDecoration: 'underline',
                                            fontSize: '1rem',
                                            color: 'primary',
                                            mt: '2px',
                                        }}
                                    >
                                        {product.averageRating}
                                    </Typography>

                                    <Rating
                                        value={product.averageRating}
                                        readOnly
                                        precision={0.1}
                                        sx={{ marginRight: 1 }}
                                    />
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ marginRight: 1 }}
                                    >
                                        |
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ marginRight: 1 }}
                                    >
                                        ({product.ratingCount} ratings)
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ marginRight: 1 }}
                                    >
                                        |
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {product.soldQuantity || 1000} sold
                                    </Typography>
                                </Box>

                                {/* Description */}
                                <Typography
                                    variant='body1'
                                    color='text.secondary'
                                    paragraph
                                >
                                    {product.description}
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
                                        ${selectedVariant?.salePrice.toFixed(2)}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            textDecoration: 'line-through',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        $
                                        {selectedVariant?.originalPrice.toFixed(
                                            2
                                        )}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Color Selection */}
                                <Typography variant='body1' gutterBottom>
                                    Select Color:
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        mb: 2,
                                    }}
                                >
                                    {productVariants.map((variant) => (
                                        <CustomTooltip
                                            key={variant.color.colorId}
                                            title={variant.color.colorName}
                                        >
                                            <Box
                                                sx={{
                                                    width: 30,
                                                    height: 30,
                                                    boxSizing: 'border-box',
                                                    borderRadius: '50%',
                                                    backgroundColor:
                                                        variant.color.hexCode,
                                                    cursor: 'pointer',
                                                    border:
                                                        selectedVariant?.color
                                                            .colorId ===
                                                        variant.color.colorId
                                                            ? '2px solid black'
                                                            : 'none',
                                                    '&:hover': {
                                                        borderColor:
                                                            'primary.main',
                                                    },
                                                }}
                                                onClick={() =>
                                                    handleColorSelect(
                                                        variant.color.colorId
                                                    )
                                                } // Handle color selection
                                            />
                                        </CustomTooltip>
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
                                            selectedVariant?.stockQuantity -
                                            quantity
                                        }`}

                                        {quantity ===
                                            selectedVariant?.stockQuantity && (
                                            <Typography
                                                component='span' // Inline to keep it part of the sentence
                                                sx={{
                                                    color: 'red',
                                                    marginLeft: 1,
                                                }} // Red color and spacing
                                            >
                                                Reach limit stock
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>

                                {/* Add to Cart & Wishlist Buttons */}
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        fullWidth
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                    >
                                        {isAdding ? 'Adding' : 'Add to Cart'}
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
                {/* Customer Feedbacks */}
                <Grid item xs={12} sm={12} md={9}>
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
                                                {feedback?.productImages
                                                    .length > 0 && (
                                                    <Grid
                                                        container
                                                        sx={{ mt: 2 }}
                                                    >
                                                        {feedback?.productImages.map(
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
                {/* Top Products */}
                <Grid item lg={3} display={{ xs: 'none', lg: 'flex' }}>
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

            <RelatedProducts />
        </Container>
    );
};

const RelatedProducts = () => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleProductClick = (id) => {
        console.log('Navigate to product ID:', id);
        // Implement navigation logic (e.g., React Router's useNavigate)
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 4,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant='h5' gutterBottom>
                Related Products
            </Typography>
            <Grid container spacing={2}>
                {relatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card sx={{ height: '100%' }}>
                            <CardMedia
                                component='img'
                                height='140'
                                image={product.image} // Replace with product.image URL
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant='h6' noWrap>
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    pb: 2,
                                }}
                            >
                                <Button
                                    size='small'
                                    variant='contained'
                                    onClick={() =>
                                        handleProductClick(product.id)
                                    }
                                >
                                    View Details
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ProductDetailPage;
