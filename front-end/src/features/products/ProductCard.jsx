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

const productItemsObjects = {
    productItems: [
        {
            productItemId: 1,
            color: {
                colorId: 12,
                colorName: 'Amber',
                hexCode: '#ba3c11',
            },
            sku: 'SEAT01AMBER',
            originalPrice: 200.0,
            salePrice: 180.0,
            stockQuantity: 5,
            productImages: [
                {
                    imageId: 3,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523960/red-chesterfield-2_ep0yxd.png',
                    mainImage: false,
                },
                {
                    imageId: 1,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523959/red-chesterfield-1_no1iqo.jpg',
                    mainImage: true,
                },
                {
                    imageId: 2,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523958/red-chesterfield-0_infgxv.jpg',
                    mainImage: false,
                },
                {
                    imageId: 4,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523961/red-chesterfield-6_xbztw7.jpg',
                    mainImage: false,
                },
                {
                    imageId: 5,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523961/red-chesterfield-9_hnaixz.jpg',
                    mainImage: false,
                },
            ],
        },
        {
            productItemId: 2,
            color: {
                colorId: 15,
                colorName: 'Forest Green',
                hexCode: '#228B22',
            },
            sku: 'SEAT01FOREST',
            originalPrice: 200.0,
            salePrice: 190.0,
            stockQuantity: 5,
            productImages: [
                {
                    imageId: 8,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523959/green-chesterfield-7_zlqzph.png',
                    mainImage: false,
                },
                {
                    imageId: 7,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523958/green-chesterfield-3_szhbpl.png',
                    mainImage: false,
                },
                {
                    imageId: 10,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523958/green-chesterfield-8_rsysvv.jpg',
                    mainImage: false,
                },
                {
                    imageId: 9,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523958/green-chesterfield-9_kltafu.jpg',
                    mainImage: false,
                },
                {
                    imageId: 6,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734523957/green-chesterfield-1_qsynur.jpg',
                    mainImage: true,
                },
            ],
        },
    ],
};
const ProductCard = ({ product }) => {
    const productItemsObject = product || productItemsObjects;

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
    const handleCardClick = () => {
        navigate(`/products/${1}`); // Navigate to the detail page
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
            onClick={handleCardClick}
        >
            <CardMedia
                component='img'
                height='200'
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
                    {selectedVariant.pr} Description for the product goes here
                    Description for the product goes here Description for the
                    product goes here Description for the product goes here
                    Description for the product goes here
                </Typography>

                {/* Row of Color Variants (Round Boxes) */}
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    {productVariants.map((variant) => (
                        <CustomTooltip
                            key={variant.color.colorName}
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
