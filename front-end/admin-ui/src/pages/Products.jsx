import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';

const initialProducts = [
    {
        productId: 2,
        productName: 'Hobro Don Sofa',
        productDescription:
            'The sofa mattress is made of polyester fabric that is dust-proof...',
        category: { categoryId: 1, categoryName: 'Seating' },
        brand: { brandId: 5, brandName: 'Herman Miller' },
        material: { materialId: 3, materialName: 'Fabric' },
        areas: [
            { areaId: 2, areaName: 'Bedroom' },
            { areaId: 1, areaName: 'Living Room' },
        ],
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
            },
        ],
        averageRating: 4.8,
        soldQuantity: 4,
        ratingCount: 178,
        productStatus: true,
    },
];

export default function ProductManagement() {
    const [products, setProducts] = useState(initialProducts);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleOpen = (product = null) => {
        setEditingProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingProduct(null);
    };

    const handleSave = (product) => {
        if (editingProduct) {
            // Update product
            setProducts((prev) =>
                prev.map((p) =>
                    p.productId === editingProduct.productId ? product : p
                )
            );
        } else {
            // Add new product
            const newProduct = { ...product, productId: Date.now() };
            setProducts((prev) => [...prev, newProduct]);
        }
        handleClose();
    };

    const handleDelete = (productId) => {
        setProducts((prev) => prev.filter((p) => p.productId !== productId));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Product Management
            </Typography>

            {/* Add Product Button */}
            <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={() => handleOpen()}
                sx={{ mb: 2 }}
            >
                Add Product
            </Button>

            {/* Product Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.productId}>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>
                                    {product.category.categoryName}
                                </TableCell>
                                <TableCell>{product.brand.brandName}</TableCell>
                                <TableCell>
                                    {product.productStatus
                                        ? 'Available'
                                        : 'Out of Stock'}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleOpen(product)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            handleDelete(product.productId)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Product Form Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <ProductForm
                        product={editingProduct}
                        onCancel={handleClose}
                        onSave={handleSave}
                    />
                </Box>
            </Modal>
        </Box>
    );
}
