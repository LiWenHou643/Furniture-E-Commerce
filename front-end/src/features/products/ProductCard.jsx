import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTooltip from '../../components/CustomTooltip';

const ProductCard = ({ product }) => {
    const productItemsObject = product;

    const navigate = useNavigate(); // Use navigate hook

    const productVariants = productItemsObject.productItems;

    // State to track selected color
    const [selectedVariant, setSelectedVariant] = useState(
        productItemsObject.productItems[0]
    );

    const handleColorSelect = (e, color) => {
        e.stopPropagation(); // Prevent card click event from triggering navigation
        const selected = productVariants.find(
            (variant) => variant.color.colorName === color
        );
        setSelectedVariant(selected);
    };

    // Handle card click to navigate to the product detail page
    const handleCardClick = (product) => {
        navigate(`/products/${product?.productId}`); // Navigate to the detail page
    };

    // Handle "Add to Cart" click (do not navigate)
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent card click event from triggering navigation
        // Add to cart logic goes here
        console.log('Added to cart:', selectedVariant);
    };

    return (
        <Card
            sx={{ height: '100%', cursor: 'pointer' }}
            onClick={() => handleCardClick(product)}
        >
            <CardMedia
                component='img'
                height='250'
                image={
                    selectedVariant.productImages.find(
                        (image) => image.mainImage
                    )?.imageUrl ||
                    selectedVariant.productImages[0] ||
                    'https://placeholder.com/200' // Fallback if no mainImage is true
                }
                alt='Product Image'
            />

            <CardContent>
                <Typography variant='h6' gutterBottom>
                    {selectedVariant.color.colorName} Sofa
                </Typography>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    p={0}
                >
                    <Typography variant='body2' color='text.primary'>
                        SKU: {selectedVariant.sku}
                    </Typography>
                    <Typography variant='body2' color='text.primary'>
                        Stock: {selectedVariant.stockQuantity}
                    </Typography>
                </Box>
                <Typography
                    color='text.secondary'
                    gutterBottom
                    sx={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2, // Limits to 2 lines
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {product.productDescription || 'No description available'}
                </Typography>

                {/* Row of Color Variants (Round Boxes) */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {productVariants.map((variant) => (
                        <CustomTooltip
                            key={
                                variant.productItemId + variant.color.colorName
                            }
                            title={variant.color.colorName}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    boxSizing: 'border-box',
                                    borderRadius: '50%',
                                    backgroundColor: variant.color.hexCode,
                                    cursor: 'pointer',
                                    border:
                                        selectedVariant.color.colorName.toLowerCase() ===
                                        variant.color.colorName.toLowerCase()
                                            ? '2px solid black'
                                            : 'none',
                                    '&:hover': {
                                        border: '2px solid black',
                                    },
                                }}
                                onClick={(e) =>
                                    handleColorSelect(
                                        e,
                                        variant.color.colorName
                                    )
                                }
                            />
                        </CustomTooltip>
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
                            ${selectedVariant.originalPrice.toFixed(2)}
                        </Typography>
                        <Typography variant='h6' color='primary'>
                            ${selectedVariant.salePrice.toFixed(2)}
                        </Typography>
                    </Box>

                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
