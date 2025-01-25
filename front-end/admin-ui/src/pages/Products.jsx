import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [products, setProducts] = useState(initialProducts);

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
                onClick={() => navigate('/products-management/add')}
                sx={{ mb: 2 }}
            >
                Add Product
            </Button>

            {/* Product Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Category
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Brand
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Status
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Actions
                            </TableCell>
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
                                    <EditIcon
                                        onClick={() =>
                                            navigate(
                                                '/products-management/edit/' +
                                                    product.productId
                                            )
                                        }
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    ></EditIcon>
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(product.productId)
                                        }
                                        color='error'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    ></DeleteIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
