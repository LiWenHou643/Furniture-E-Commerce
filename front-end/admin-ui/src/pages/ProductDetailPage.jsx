import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

const initialData = {
    productId: 2,
    productName: 'Hobro Don Sofa',
    productDescription:
        'The sofa mattress is made of polyester fabric that is dust-proof, mold-resistant and the mattress cover can be easily removed for cleaning. Gray sofa cushions create a modern beauty, but no less luxurious and gentle',
    category: { categoryId: 1, categoryName: 'Seating' },
    brand: { brandId: 5, brandName: 'Herman Miller' },
    material: { materialId: 3, materialName: 'Fabric' },
    productItems: [
        {
            productItemId: 3,
            color: {
                colorId: 1,
                colorName: 'Antique Taupe',
                hexCode: '#d4c1b1',
            },
            sku: 'SEAT02',
            originalPrice: 100.0,
            salePrice: 90.0,
            stockQuantity: 50,
            productImages: [
                {
                    imageId: 15,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734524464/don-sofa-4_vgppso.png',
                    mainImage: false,
                },
                {
                    imageId: 11,
                    imageUrl:
                        'https://res.cloudinary.com/images-cloud-storage/image/upload/v1734524463/don-sofa-2_ys9d1c.png',
                    mainImage: true,
                },
            ],
        },
    ],
};

export default function ProductDetailPage() {
    const [product, setProduct] = useState(initialData);
    const [openImageModal, setOpenImageModal] = useState(false);
    const [editingProductItemId, setEditingProductItemId] = useState(null);

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductItemChange = (productItemId, field, value) => {
        setProduct((prev) => ({
            ...prev,
            productItems: prev.productItems.map((item) =>
                item.productItemId === productItemId
                    ? { ...item, [field]: value }
                    : item
            ),
        }));
    };

    const handleAddImage = (productItemId) => {
        setEditingProductItemId(productItemId);
        setOpenImageModal(true);
    };

    const handleAddProductItem = () => {
        setProduct((prev) => ({
            ...prev,
            productItems: [
                ...prev.productItems,
                {
                    productItemId: Date.now(),
                    color: { colorId: null, colorName: '', hexCode: '' },
                    sku: '',
                    originalPrice: 0,
                    salePrice: 0,
                    stockQuantity: 0,
                    productImages: [],
                },
            ],
        }));
    };

    const handleDeleteProductItem = (productItemId) => {
        setProduct((prev) => ({
            ...prev,
            productItems: prev.productItems.filter(
                (item) => item.productItemId !== productItemId
            ),
        }));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Edit Product Details
            </Typography>

            {/* Product Info */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label='Product Name'
                    name='productName'
                    value={product.productName}
                    onChange={handleProductChange}
                    margin='normal'
                />
                <TextField
                    fullWidth
                    label='Description'
                    name='productDescription'
                    value={product.productDescription}
                    onChange={handleProductChange}
                    margin='normal'
                    multiline
                    rows={4}
                />
            </Box>

            {/* Product Items (Color Variants) */}
            <Typography variant='h5' gutterBottom>
                Color Variants
            </Typography>
            <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleAddProductItem}
                sx={{ mb: 2 }}
            >
                Add Variant
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Color</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Original Price</TableCell>
                            <TableCell>Sale Price</TableCell>
                            <TableCell>Stock</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.productItems.map((item) => (
                            <TableRow key={item.productItemId}>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: item.color.hexCode,
                                                width: 24,
                                                height: 24,
                                            }}
                                        />
                                        <Typography>
                                            {item.color.colorName}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size='small'
                                        value={item.sku}
                                        onChange={(e) =>
                                            handleProductItemChange(
                                                item.productItemId,
                                                'sku',
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size='small'
                                        type='number'
                                        value={item.originalPrice}
                                        onChange={(e) =>
                                            handleProductItemChange(
                                                item.productItemId,
                                                'originalPrice',
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size='small'
                                        type='number'
                                        value={item.salePrice}
                                        onChange={(e) =>
                                            handleProductItemChange(
                                                item.productItemId,
                                                'salePrice',
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        size='small'
                                        type='number'
                                        value={item.stockQuantity}
                                        onChange={(e) =>
                                            handleProductItemChange(
                                                item.productItemId,
                                                'stockQuantity',
                                                e.target.value
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() =>
                                            handleAddImage(item.productItemId)
                                        }
                                    ></EditIcon>
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDeleteProductItem(
                                                item.productItemId
                                            )
                                        }
                                    ></DeleteIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Managing Images */}
            <Modal
                open={openImageModal}
                onClose={() => setOpenImageModal(false)}
            >
                <Box
                    sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2 }}
                >
                    <Typography variant='h6'>Manage Images</Typography>
                    <Button
                        variant='contained'
                        onClick={() => {
                            setOpenImageModal(false);
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
