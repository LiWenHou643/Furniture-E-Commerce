import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { useState } from 'react';
const ProductCard = () => {
    const colorVariants = [
        {
            color: 'Red',
            originalPrice: 29.99,
            discountedPrice: 24.99,
            hex: '#f44336',
        },
        {
            color: 'Blue',
            originalPrice: 32.99,
            discountedPrice: 27.99,
            hex: '#2196f3',
        },
        {
            color: 'Green',
            originalPrice: 27.99,
            discountedPrice: 22.99,
            hex: '#4caf50',
        },
        {
            color: 'Yellow',
            originalPrice: 28.99,
            discountedPrice: 23.99,
            hex: '#ffeb3b',
        },
    ];

    // State to track selected color
    const [selectedColor, setSelectedColor] = useState(colorVariants[0]);

    const handleColorSelect = (color) => {
        const selected = colorVariants.find(
            (variant) => variant.color === color
        );
        setSelectedColor(selected);
    };

    return (
        <Card sx={{ height: '100%' }}>
            <CardMedia
                component='img'
                height='200'
                image='https://placehold.co/300'
                alt='Product Image'
            />
            <CardContent>
                <Typography variant='h6' gutterBottom>
                    Product Title
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Product description goes here. Short and concise.
                </Typography>

                {/* Row of Color Variants (Round Boxes) */}
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
                                    selectedColor.color === variant.color
                                        ? '2px solid black'
                                        : 'none',
                                '&:hover': {
                                    border: '2px solid black', // Show border on hover
                                },
                            }}
                            onClick={() => handleColorSelect(variant.color)}
                        />
                    ))}
                </Box>

                {/* Pricing Information */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Typography
                            variant='body2'
                            sx={{
                                textDecoration: 'line-through',
                                color: 'text.secondary',
                            }}
                        >
                            ${selectedColor.originalPrice.toFixed(2)}
                        </Typography>
                        <Typography variant='h6' color='primary'>
                            ${selectedColor.discountedPrice.toFixed(2)}
                        </Typography>
                    </Box>

                    <Button variant='contained' color='primary'>
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
