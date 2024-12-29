import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Rating,
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
        <Box sx={{ padding: 4, marginTop: 10 }}>
            <Grid container spacing={4}>
                {/* Product Images */}
                <Grid item xs={12} sm={6} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/* ReactImageMagnify Zoom Component */}
                        <ImageMagnifier
                            src={selectedImage}
                            width={500}
                            height={500}
                            magnifierHeight={300}
                            magnifierWidth={300}
                            zoomLevel={2}
                            alt='Sample Image'
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
                                        borderColor: theme.palette.primary.main, // Use primary color on hover
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
                            <Rating
                                value={rating}
                                readOnly
                                precision={0.1}
                                sx={{ marginBottom: 2 }}
                            />
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
                                    ${selectedColor.discountedPrice.toFixed(2)}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        textDecoration: 'line-through',
                                        color: 'text.secondary',
                                    }}
                                >
                                    ${selectedColor.originalPrice.toFixed(2)}
                                </Typography>
                            </Box>

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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetailPage;
