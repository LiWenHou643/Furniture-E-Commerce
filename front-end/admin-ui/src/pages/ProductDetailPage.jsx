import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomTooltip from '../components/CustomTooltip';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useAddColor from '../hooks/useAddColor';
import useAddProductVariant from '../hooks/useAddProductVariant';
import useFetchBrand from '../hooks/useFetchBrand';
import useFetchCategory from '../hooks/useFetchCategory';
import useFetchColor from '../hooks/useFetchColor';
import useFetchMaterial from '../hooks/useFetchMaterial';
import useFetchProduct from '../hooks/useFetchProduct';
import useUpdateProduct from '../hooks/useUpdateProduct';

export default function ProductDetailPage() {
    const { productId } = useParams();
    const { data: product, isLoading, error } = useFetchProduct(productId);

    const { mutate: addColor } = useAddColor();
    const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
    const { mutate: addProductVariant } = useAddProductVariant();
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

    const [newColor, setNewColor] = useState({
        colorName: '',
        hexCode: '#000000',
    });
    const [editProduct, setEditProduct] = useState({});
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [materialId, setMaterialId] = useState(null);
    const [editingProductItemId, setEditingProductItemId] = useState(null);
    const [newProductItem, setNewProductItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openAddColorModal, setOpenAddColorModal] = useState(false);

    // Initialize editProduct state when product data is fetched
    useEffect(() => {
        if (product) {
            setEditProduct(product); // Populate state with fetched product data
            setCategory(
                categories.find(
                    (category) =>
                        category.categoryId === product.category.categoryId
                )
            );
            setBrand(
                brands.find((brand) => brand.brandId === product.brand.brandId)
            );
            setMaterial(
                materials.find(
                    (material) =>
                        material.materialId === product.material.materialId
                )
            );
        }
    }, [product, categories, brands, materials]);

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
        setEditProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductItemChange = (productItemId, field, value) => {};

    const handleDeleteProductItem = (productItemId) => {};

    const handleAddImage = (productItemId) => {
        setEditingProductItemId(productItemId);
    };

    const handleAddVariant = () => {
        setNewProductItem({
            color: { colorName: '', hexCode: '' },
            sku: '',
            originalPrice: 0,
            salePrice: 0,
            stockQuantity: 0,
            productImages: [],
        });
    };

    const toggleEditingMode = () => {
        setIsEditing((prev) => !prev);
    };

    const handleUpdateProduct = (product) => {
        updateProduct(
            {
                ...product,
                categoryId: categoryId,
                brandId: brandId,
                materialId: materialId,
            },
            {
                onSettled: () => {
                    setIsEditing(false);
                    setNewProductItem(null);
                },
            }
        );
        if (newProductItem !== null) {
            addProductVariant(
                {
                    productId: product.productId,
                    sku: newProductItem.sku,
                    originalPrice: newProductItem.originalPrice,
                    salePrice: newProductItem.salePrice,
                    stockQuantity: newProductItem.stockQuantity,
                    colorId: newProductItem.color.colorId,
                    colorName: newProductItem.color.colorName,
                    hexCode: newProductItem.color.hexCode,
                    productImages: newProductItem.productImages.map((img) => ({
                        file: img.file,
                        mainImage: img.mainImage,
                    })),
                },
                {
                    onSettled: () => {
                        setIsEditing(false);
                        setNewProductItem(null);
                    },
                }
            );
        }
    };

    const handleSelectColor = (color) => {
        setNewProductItem((prev) => ({
            ...prev,
            color: color,
        }));
    };

    const handleAddNewColor = () => {
        if (newColor.colorName && newColor.hexCode) {
            const addedColor = { ...newColor };

            console.log('Adding new color:', addedColor);
            addColor(addedColor, {
                onSettled: () => {
                    setOpenAddColorModal(false);
                    setNewColor({ colorName: '', hexCode: '' });
                },
            });
        } else {
            alert('Please provide both a color name and a hex code.');
        }
    };

    const handleSetMainImage = (imageId) => {
        setNewProductItem((prev) => ({
            ...prev,
            productImages: prev.productImages.map((img) => ({
                ...img,
                mainImage: img.imageId === imageId,
            })),
        }));
    };

    const handleImageUpload = (files) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewUrl = e.target.result;

            setNewProductItem((prev) => ({
                ...prev,
                productImages: [
                    ...prev.productImages,
                    {
                        imageId: Date.now(),
                        imageUrl: '',
                        previewUrl: previewUrl,
                        mainImage: prev.productImages.length === 0,
                    },
                ],
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleDeleteImage = (imageId) => {
        setNewProductItem((prev) => ({
            ...prev,
            productImages: prev.productImages.filter(
                (img) => img.imageId !== imageId
            ),
        }));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant='h4' gutterBottom>
                    {isEditing
                        ? 'Edit Product Details'
                        : 'View Product Details'}
                </Typography>

                {/* Toggle Edit Mode Button */}
                <Button
                    variant='contained'
                    color={isEditing ? 'secondary' : 'primary'}
                    onClick={toggleEditingMode}
                    sx={{ mb: 4 }}
                >
                    {isEditing ? 'Cancel Editing' : 'Enable Editing'}
                </Button>

                {/* Save Button */}
                {isEditing && (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            handleUpdateProduct(editProduct);
                        }}
                        disabled={isUpdating}
                        sx={{ mb: 4 }}
                    >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                )}
            </Box>

            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label='Product Name'
                    name='productName'
                    value={editProduct.productName || ''}
                    onChange={handleProductChange}
                    margin='normal'
                    disabled={!isEditing}
                    InputProps={{
                        readOnly: !isEditing, // Use readOnly instead of disabled to preserve styles
                    }}
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'rgba(0, 0, 0, 0.87)', // Default font color for better readability
                            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', // Fix for Webkit browsers
                        },
                    }}
                />
                <TextField
                    fullWidth
                    label='Description'
                    name='productDescription'
                    value={editProduct.productDescription || ''}
                    onChange={handleProductChange}
                    margin='normal'
                    multiline
                    rows={4}
                    disabled={!isEditing}
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'rgba(0, 0, 0, 0.87)',
                            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        mb: 0,
                    }}
                />
            </Box>

            {/* Category Selection */}
            <FormControl
                fullWidth
                margin='normal'
                sx={{ mt: 0 }}
                required
                disabled={!isEditing} // Disables when not in editing mode
            >
                <InputLabel>Category</InputLabel>
                <Select
                    value={category.categoryId || ''}
                    onChange={(e) => {
                        setCategory(
                            categories.find(
                                (category) =>
                                    category.categoryId === e.target.value
                            )
                        );
                        setCategoryId(e.target.value);
                    }}
                    disabled={!isEditing} // Disables when not in editing mode
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'rgba(0, 0, 0, 0.87)',
                            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        mb: 0,
                    }}
                >
                    {categories.map((category) => (
                        <MenuItem
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.categoryName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Brand Selection */}
            <FormControl
                fullWidth
                margin='normal'
                required
                disabled={!isEditing}
            >
                <InputLabel>Brand</InputLabel>
                <Select
                    value={brand.brandId || ''}
                    onChange={(e) => {
                        setBrand(
                            brands.find(
                                (brand) => brand.brandId === e.target.value
                            )
                        );
                        setBrandId(e.target.value);
                    }}
                    disabled={!isEditing}
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'rgba(0, 0, 0, 0.87)',
                            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        mb: 0,
                    }}
                >
                    {brands.map((brand) => (
                        <MenuItem key={brand.brandId} value={brand.brandId}>
                            {brand.brandName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Material Selection */}
            <FormControl
                fullWidth
                margin='normal'
                required
                disabled={!isEditing}
            >
                <InputLabel>Material</InputLabel>
                <Select
                    value={material.materialId || ''}
                    onChange={(e) => {
                        setMaterial(
                            materials.find(
                                (material) =>
                                    material.materialId === e.target.value
                            )
                        );
                        setMaterialId(e.target.value);
                    }}
                    disabled={!isEditing}
                    sx={{
                        '& .MuiInputBase-input.Mui-disabled': {
                            color: 'rgba(0, 0, 0, 0.87)',
                            WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
                        },
                        mb: 0,
                    }}
                >
                    {materials.map((material) => (
                        <MenuItem
                            key={material.materialId}
                            value={material.materialId}
                        >
                            {material.materialName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Product Items (Color Variants) */}
            <Typography variant='h5' gutterBottom>
                Color Variants
            </Typography>
            <Button
                variant='contained'
                startIcon={<AddIcon />}
                onClick={handleAddVariant}
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

            {/* Model for Adding New Product Item */}
            <Modal
                open={newProductItem !== null}
                onClose={() => setNewProductItem(null)}
            >
                <Box
                    sx={{
                        p: 4,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        width: 600,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Typography variant='h6'>Add New Variant</Typography>
                        <IconButton
                            color='primary'
                            onClick={() => setNewProductItem(null)}
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <TextField
                        fullWidth
                        label='SKU'
                        value={newProductItem?.sku || ''}
                        onChange={(e) =>
                            setNewProductItem((prev) => ({
                                ...prev,
                                sku: e.target.value,
                            }))
                        }
                        margin='normal'
                    />
                    <TextField
                        fullWidth
                        label='Original Price'
                        value={newProductItem?.originalPrice || 0}
                        onChange={(e) =>
                            setNewProductItem((prev) => ({
                                ...prev,
                                originalPrice: Number(e.target.value),
                            }))
                        }
                        margin='normal'
                        type='number'
                    />
                    <TextField
                        fullWidth
                        label='Sale Price'
                        value={newProductItem?.salePrice || 0}
                        onChange={(e) =>
                            setNewProductItem((prev) => ({
                                ...prev,
                                salePrice: Number(e.target.value),
                            }))
                        }
                        margin='normal'
                        type='number'
                    />
                    <TextField
                        fullWidth
                        label='Stock Quantity'
                        value={newProductItem?.stockQuantity || 0}
                        onChange={(e) =>
                            setNewProductItem((prev) => ({
                                ...prev,
                                stockQuantity: Number(e.target.value),
                            }))
                        }
                        margin='normal'
                        type='number'
                    />

                    <Box>
                        <Typography variant='body2'>
                            Select Color:{' '}
                            {newProductItem?.color?.colorName && (
                                <Typography
                                    component='span'
                                    variant='body2'
                                    sx={{
                                        mt: 1,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {newProductItem?.color?.colorName}
                                </Typography>
                            )}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1,
                                mt: 1,
                            }}
                        >
                            {colors?.map((color) => (
                                <CustomTooltip
                                    key={color.colorId + color.colorName}
                                    title={color.colorName}
                                >
                                    <Box
                                        sx={{
                                            width: 30,
                                            height: 30,
                                            backgroundColor: color.hexCode,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            border:
                                                newProductItem?.color
                                                    .colorId === color.colorId
                                                    ? '3px solid #000'
                                                    : '1px solid #ddd',
                                        }}
                                        onClick={() => handleSelectColor(color)}
                                    />
                                </CustomTooltip>
                            ))}
                            <CustomTooltip title='Add New Color'>
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 30,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        border: '1px solid #ddd',
                                    }}
                                    onClick={() => setOpenAddColorModal(true)}
                                >
                                    +
                                </Box>
                            </CustomTooltip>
                        </Box>

                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    mt: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant='body2'>
                                    Product Images
                                </Typography>
                                <Button
                                    variant='contained'
                                    component='label'
                                    startIcon={<UploadFileIcon />}
                                >
                                    Upload
                                    <input
                                        type='file'
                                        hidden
                                        accept='image/*'
                                        onChange={(e) =>
                                            handleImageUpload(e.target.files)
                                        }
                                    />
                                </Button>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 1,
                                    mt: 1,
                                    maxWidth: '100%',
                                    overflowX: 'auto',
                                }}
                            >
                                {newProductItem?.productImages?.map((img) => (
                                    <Box
                                        key={img.imageId}
                                        sx={{
                                            position: 'relative',
                                            display: 'inline-block',
                                            width: 80,
                                            height: 80,
                                            border: img.mainImage
                                                ? '2px solid green'
                                                : '1px solid #ddd',
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            handleSetMainImage(img.imageId)
                                        }
                                    >
                                        <Avatar
                                            src={img.previewUrl} // Use the preview URL here
                                            variant='square'
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        />
                                        <IconButton
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                right: -10,
                                                bgcolor: 'white',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(img.imageId);
                                            }}
                                        >
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                        {img.mainImage && (
                                            <Typography
                                                sx={{
                                                    position: 'absolute',
                                                    bottom: 2,
                                                    left: '50%',
                                                    transform:
                                                        'translateX(-50%)',
                                                    bgcolor:
                                                        'rgba(0, 0, 0, 0.6)',
                                                    color: 'white',
                                                    fontSize: '0.75rem',
                                                    borderRadius: 1,
                                                    px: 0.5,
                                                }}
                                            >
                                                Main
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            mt: 2,
                        }}
                    >
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => {
                                handleUpdateProduct(editProduct);
                                // setNewProductItem(null);
                            }}
                            disabled={
                                isUpdating ||
                                !newProductItem?.color.colorId ||
                                !newProductItem.sku ||
                                newProductItem.productImages.length === 0 ||
                                newProductItem.productImages.filter(
                                    (img) => img.mainImage
                                ).length !== 1
                            }
                        >
                            Save Variant
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Modal for Adding New Colors */}
            <Modal
                open={openAddColorModal}
                onClose={() => setOpenAddColorModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant='h6' gutterBottom>
                        Add New Color
                    </Typography>
                    <TextField
                        fullWidth
                        label='Color Name'
                        value={newColor.colorName}
                        onChange={(e) =>
                            setNewColor((prev) => ({
                                ...prev,
                                colorName: e.target.value,
                            }))
                        }
                        margin='normal'
                    />
                    <TextField
                        fullWidth
                        label='Hex Code'
                        value={newColor.hexCode}
                        onChange={(e) =>
                            setNewColor((prev) => ({
                                ...prev,
                                hexCode: e.target.value,
                            }))
                        }
                        margin='normal'
                        type='color'
                    />
                    <Button
                        variant='contained'
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleAddNewColor}
                    >
                        Add Color
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
