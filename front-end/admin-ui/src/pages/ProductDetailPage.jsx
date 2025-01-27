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
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useFetchBrand from '../hooks/useFetchBrand';
import useFetchCategory from '../hooks/useFetchCategory';
import useFetchColor from '../hooks/useFetchColor';
import useFetchMaterial from '../hooks/useFetchMaterial';
import useFetchProduct from '../hooks/useFetchProduct';

export default function ProductDetailPage() {
    const { productId } = useParams();
    const { data: product, isLoading, error } = useFetchProduct(productId);
    const {
        data: colors,
        isLoading: loadingColor,
        error: errorColor,
    } = useFetchColor();
    const {
        data: brands,
        isLoading: loadingBrand,
        error: errorBrand,
    } = useFetchBrand();
    const {
        data: categories,
        isLoading: loadingCategory,
        error: errorCategory,
    } = useFetchCategory();
    const {
        data: materials,
        isLoading: loadingMaterial,
        error: errorMaterial,
    } = useFetchMaterial();
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [openImageModal, setOpenImageModal] = useState(false);
    const [editingProductItemId, setEditingProductItemId] = useState(null);

    if (
        isLoading ||
        loadingBrand ||
        loadingCategory ||
        loadingMaterial ||
        loadingColor
    )
        return <Loading />;

    if (error) return <Error error={error} />;
    if (errorBrand) return <Error error={errorBrand} />;
    if (errorCategory) return <Error error={errorCategory} />;
    if (errorMaterial) return <Error error={errorMaterial} />;
    if (errorColor) return <Error error={errorColor} />;

    const handleProductChange = (e) => {
        const { name, value } = e.target;
    };

    const handleProductItemChange = (productItemId, field, value) => {};

    const handleAddImage = (productItemId) => {
        setEditingProductItemId(productItemId);
        setOpenImageModal(true);
    };

    const handleAddProductItem = () => {};

    const handleDeleteProductItem = (productItemId) => {};

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
