import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTooltip from '../../components/CustomTooltip';
import useAddToCart from '../../hooks/useAddToCart';

const ProductCard = ({ product }) => {
    const productItemsObject = product;

    const navigate = useNavigate(); // Use navigate hook

    const { mutate: addToCart, isLoading: isAdding } = useAddToCart();

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
        addToCart({
            productItemId: selectedVariant.productItemId,
            quantity: 1,
        });
    };

    return (
        <Card
            sx={{ height: '100%', cursor: 'pointer' }}
            onClick={() => handleCardClick(product)}
        >
            <div style={{ position: 'relative' }}>
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
                {/* The "Hot Sales" tag */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: '#FFABABFF',
                        color: '#000',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                    }}
                >
                    Hot Sales
                </div>
            </div>

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
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Rating
                            value={product.averageRating}
                            readOnly
                            size='small'
                            max={1}
                        />
                        <Typography variant='body2' color='text.secondary'>
                            {product.averageRating}
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{
                                mx: 1,
                            }}
                        >
                            |
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            {product.ratingCount} reviews
                        </Typography>
                    </Box>

                    <Typography variant='body2' color='text.secondary'>
                        1000 sold
                    </Typography>
                </Box>

                {/* Product Description */}
                {/* <Typography
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
                </Typography> */}

                {/* Row of Color Variants (Round Boxes) */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1, my: 1 }}>
                        {productVariants.map((variant) => (
                            <CustomTooltip
                                key={
                                    variant.productItemId +
                                    variant.color.colorName
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
                    <Typography variant='body2' color='text.primary'>
                        Stock: {selectedVariant.stockQuantity} units
                    </Typography>
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
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : 'Add to Cart'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
