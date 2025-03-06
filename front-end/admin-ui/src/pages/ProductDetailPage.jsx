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
    Stack,
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
import useDeleteProductVariant from '../hooks/useDeleteProductVariant';
import useFetchBrand from '../hooks/useFetchBrand';
import useFetchCategory from '../hooks/useFetchCategory';
import useFetchColor from '../hooks/useFetchColor';
import useFetchMaterial from '../hooks/useFetchMaterial';
import useFetchProduct from '../hooks/useFetchProduct';
import useUpdateProduct from '../hooks/useUpdateProduct';
import useUpdateProductVariant from '../hooks/useUpdateProductVariant';

export default function ProductDetailPage() {
    const { productId } = useParams();
    const { data: product, isLoading, error } = useFetchProduct(productId);

    const { mutate: addColor } = useAddColor();
    const { mutate: updateProduct, isLoading: isUpdating } = useUpdateProduct();
    const { mutate: addProductVariant, isLoading: isAddingVariant } =
        useAddProductVariant();
    const { mutate: updateProductVariant, isLoading: isUpdatingVariant } =
        useUpdateProductVariant();
    const { mutate: deleteProductVariant, isLoading: isDeletingVariant } =
        useDeleteProductVariant();

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
    const [editVariant, setEditVariant] = useState({});
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [categoryId, setCategoryId] = useState(null);
    const [brandId, setBrandId] = useState(null);
    const [materialId, setMaterialId] = useState(null);
    const [newProductItem, setNewProductItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openAddColorModal, setOpenAddColorModal] = useState(false);
    const [newImages, setNewImages] = useState([]);
    // Initialize editProduct state when product data is fetched
    useEffect(() => {
        if (product) {
            setEditProduct(product); // Populate state with fetched product data

            // Set the selected category, brand, and material
            if (categories) {
                setCategory(
                    categories.find(
                        (category) =>
                            category.categoryId === product.category.categoryId
                    )
                );
            }
            if (brands) {
                setBrand(
                    brands.find(
                        (brand) => brand.brandId === product.brand.brandId
                    )
                );
            }
            if (materials) {
                setMaterial(
                    materials.find(
                        (material) =>
                            material.materialId === product.material.materialId
                    )
                );
            }
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

    const handleDeleteProductItem = (productItemId) => {
        deleteProductVariant(productItemId);
    };

    const handleOpenAddVariantModal = () => {
        setNewProductItem({
            color: { colorName: '', hexCode: '' },
            sku: '',
            originalPrice: 0,
            salePrice: 0,
            stockQuantity: 0,
            productImages: [],
        });
    };

    const handleOpenEditVariantModal = (productItem) => {
        setEditVariant({
            ...productItem,
            productId: productId,
        });
    };

    const handleAddProductItem = () => {
        if (
            newProductItem?.color?.colorId ||
            newProductItem.sku ||
            newProductItem.productImages.length === 0 ||
            newProductItem.productImages.filter((img) => img.mainImage)
                .length !== 1
        ) {
            console.log('Adding new product item:', newProductItem);
            addProductVariant(
                {
                    productId: product.productId,
                    sku: newProductItem.sku,
                    originalPrice: newProductItem.originalPrice,
                    salePrice: newProductItem.salePrice,
                    stockQuantity: newProductItem.stockQuantity,
                    color: newProductItem.color,
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

    const toggleEditingMode = () => {
        setIsEditing((prev) => !prev);

        setEditProduct(product); // Reset the editProduct state to the original product data
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

    const handleSetMainImage = (index) => {
        setNewProductItem((prev) => ({
            ...prev,
            productImages: prev.productImages.map((img, i) => ({
                ...img,

                mainImage: i === index,
            })),
        }));
    };

    const handleSetMainImageForEditVariant = (imageId) => {
        setEditVariant({
            ...editVariant,
            productImages: editVariant.productImages.map((img) => ({
                ...img,
                mainImage: img.imageId === imageId,
            })),
        });

        setNewImages((prev) =>
            prev.map((img) => ({
                ...img,
                mainImage: false,
            }))
        );
    };

    const handleSetMainImageForNewImages = (index) => {
        setNewImages((prev) =>
            prev.map((image, i) => ({
                ...image,
                mainImage: i === index,
            }))
        );

        setEditVariant({
            ...editVariant,
            productImages: editVariant.productImages.map((img) => ({
                ...img,
                mainImage: false,
            })),
        });
    };

    const handleImageUpload = (event) => {
        // Ensure that the target is a file input element and that files are present
        const files = event.target?.files;

        if (!files || files.length === 0) {
            console.error('No files selected or invalid input element');
            return; // Prevent errors if no file selected or if it's not a valid input element
        }

        const uploadedImages = Array.from(files)
            .map((file) => {
                if (!(file instanceof Blob)) {
                    console.error('Invalid file type:', file);
                    return null; // Ignore invalid files
                }

                return {
                    imageId: null, // New images have no ID yet
                    imageUrl: URL.createObjectURL(file), // Preview image
                    mainImage: false,
                    file: file, // Store file object for API upload
                };
            })
            .filter((img) => img !== null); // Remove null entries

        setNewProductItem((prev) => ({
            ...prev,
            productImages: [...prev.productImages, ...uploadedImages],
        }));
    };

    const handleImageUploadForEditVariant = (event) => {
        // Ensure that the target is a file input element and that files are present
        const files = event.target?.files;

        if (!files || files.length === 0) {
            console.error('No files selected or invalid input element');
            return; // Prevent errors if no file selected or if it's not a valid input element
        }

        const uploadedImages = Array.from(files)
            .map((file) => {
                if (!(file instanceof Blob)) {
                    console.error('Invalid file type:', file);
                    return null; // Ignore invalid files
                }

                return {
                    imageId: null, // New images have no ID yet
                    imageUrl: URL.createObjectURL(file), // Preview image
                    mainImage: false,
                    file: file, // Store file object for API upload
                };
            })
            .filter((img) => img !== null); // Remove null entries

        setNewImages([...newImages, ...uploadedImages]);
    };

    const handleDeleteImage = (index) => {
        setNewProductItem((prev) => ({
            ...prev,
            productImages: prev.productImages.filter((img, i) => i !== index),
        }));
    };

    const handleDeleteImageInEditVariant = (id) => {
        setEditVariant((prev) => ({
            ...prev,
            productImages: prev.productImages.filter(
                (img) => img.imageId !== id
            ),
        }));
    };

    const handleDeleteImageInNewImages = (index) => {
        setNewImages((prev) => prev.filter((img, i) => i !== index));
    };

    // Save Changes
    const handleSaveEditVariant = () => {
        if (editVariant) {
            if (editVariant.salePrice > editVariant.originalPrice) {
                alert('Sale price cannot be higher than original price.');
                return;
            }
            console.log('Saving variant changes:', editVariant);
            console.log('New images:', newImages);
            if (newImages.length > 0) {
                // Handle image uploads
                updateProductVariant(
                    { editVariant, newImages },
                    {
                        onSettled: () => {
                            setEditVariant(null);
                            setNewImages([]);
                        },
                    }
                );
            } else {
                // No new images, just update the product variant
                updateProductVariant(
                    { editVariant, newImages: [] },
                    {
                        onSettled: () => {
                            setEditVariant(null);
                            setNewImages([]);
                        },
                    }
                );
            }
        }
    };

    // Cancel Editing & Restore Original Data
    const handleCancelEdit = () => {
        setEditVariant(null); // Exit edit mode
        setNewImages([]); // Clear new images
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
                    value={category?.categoryId || ''}
                    onChange={(e) => {
                        setCategory(
                            categories?.find(
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
                    value={brand?.brandId || ''}
                    onChange={(e) => {
                        setBrand(
                            brands?.find(
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
                    {brands?.map((brand) => (
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
                    value={material?.materialId || ''}
                    onChange={(e) => {
                        setMaterial(
                            materials?.find(
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
                onClick={handleOpenAddVariantModal}
                sx={{ mb: 2 }}
                disabled={!isEditing}
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
                                        <Avatar
                                            src={
                                                item.productImages.find(
                                                    (img) => img.mainImage
                                                )?.imageUrl
                                            }
                                            variant='rounded'
                                            alt={item.color.colorName}
                                        ></Avatar>

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
                                <TableCell>{item.sku}</TableCell>
                                <TableCell>{item.originalPrice}</TableCell>
                                <TableCell>{item.salePrice}</TableCell>
                                <TableCell>{item.stockQuantity}</TableCell>
                                <TableCell>
                                    <Stack
                                        direction='row'
                                        spacing={1}
                                        justifyContent='start'
                                        alignItems='center'
                                    >
                                        <IconButton
                                            color='primary'
                                            onClick={() =>
                                                handleOpenEditVariantModal(item)
                                            }
                                            disabled={!isEditing}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color='error'
                                            onClick={() =>
                                                handleDeleteProductItem(
                                                    item.productItemId
                                                )
                                            }
                                            disabled={
                                                !isEditing || isDeletingVariant
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal for Adding New Product Item */}
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
                                        multiple
                                        hidden
                                        onChange={handleImageUpload}
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
                                {newProductItem?.productImages?.map(
                                    (img, index) => (
                                        <Box
                                            key={index}
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
                                                handleSetMainImage(index)
                                            }
                                        >
                                            <Avatar
                                                src={img.imageUrl} // Use the preview URL here
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
                                                    handleDeleteImage(index);
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
                                    )
                                )}
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
                                handleAddProductItem(editProduct);
                            }}
                            disabled={
                                isAddingVariant ||
                                !newProductItem?.color.colorId ||
                                !newProductItem.sku ||
                                newProductItem.productImages.length === 0 ||
                                newProductItem.productImages.filter(
                                    (img) => img.mainImage
                                ).length !== 1
                            }
                        >
                            {isAddingVariant ? 'Adding...' : 'Add Variant'}
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

            {/* Modal for Editing Product Variant */}
            <Modal
                open={editVariant !== null && editVariant?.productItemId > 0}
                onClose={() => {
                    setEditVariant(null);
                    setNewImages([]);
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant='h6' gutterBottom>
                        Edit Product Variant
                    </Typography>

                    {editVariant && (
                        <Stack spacing={2}>
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant='subtitle1'>
                                        Color: {editVariant?.color?.colorName}
                                    </Typography>

                                    <Box
                                        sx={{
                                            bgcolor:
                                                editVariant?.color?.hexCode,
                                            width: 24,
                                            height: 24,
                                        }}
                                    />
                                </Box>
                            </Box>
                            <TextField
                                label='SKU'
                                value={editVariant.sku}
                                onChange={(e) =>
                                    setEditVariant({
                                        ...editVariant,
                                        sku: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                label='Original Price'
                                type='number'
                                value={editVariant.originalPrice}
                                onChange={(e) =>
                                    setEditVariant({
                                        ...editVariant,
                                        originalPrice: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                label='Sale Price'
                                type='number'
                                value={editVariant.salePrice}
                                onChange={(e) =>
                                    setEditVariant({
                                        ...editVariant,
                                        salePrice: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                label='Stock Quantity'
                                type='number'
                                value={editVariant.stockQuantity}
                                onChange={(e) =>
                                    setEditVariant({
                                        ...editVariant,
                                        stockQuantity: e.target.value,
                                    })
                                }
                            />

                            {/* IMAGE MANAGEMENT */}
                            <Typography variant='subtitle1'>
                                Product Images
                            </Typography>
                            <Stack spacing={2}>
                                {editVariant?.productImages?.map((img) => (
                                    <Box
                                        key={img.imageId}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <img
                                            src={img.imageUrl}
                                            alt='Product'
                                            width={70}
                                            height={70}
                                            style={{
                                                borderRadius: 8,
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Button
                                            size='small'
                                            variant={
                                                img.mainImage
                                                    ? 'contained'
                                                    : 'outlined'
                                            }
                                            color='primary'
                                            onClick={() => {
                                                if (!img.mainImage) {
                                                    handleSetMainImageForEditVariant(
                                                        img.imageId
                                                    );
                                                }
                                            }}
                                        >
                                            {img.mainImage
                                                ? 'Main Image'
                                                : 'Set as Main'}
                                        </Button>

                                        <IconButton
                                            color='error'
                                            onClick={() =>
                                                handleDeleteImageInEditVariant(
                                                    img.imageId
                                                )
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>

                            {/* UPLOAD NEW IMAGES */}
                            <Button variant='contained' component='label'>
                                Upload New Images
                                <input
                                    type='file'
                                    multiple
                                    hidden
                                    onChange={handleImageUploadForEditVariant}
                                />
                            </Button>

                            {/* PREVIEW NEW UPLOADED IMAGES */}
                            <Stack
                                spacing={2}
                                direction='row'
                                sx={{ overflowX: 'auto' }}
                            >
                                {newImages?.map((img, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            position: 'relative',
                                            border:
                                                img.mainImage === true
                                                    ? '2px solid rgb(31, 173, 67)'
                                                    : 'none',
                                            borderRadius: 4,
                                            cursor: 'pointer',
                                            overflow: 'hidden', // Hide overflow if the image exceeds box dimensions
                                            width: '80px',
                                            height: '80px', // Set the height explicitly, or set it based on the parent container
                                        }}
                                        onClick={() =>
                                            handleSetMainImageForNewImages(
                                                index
                                            )
                                        }
                                    >
                                        <img
                                            src={img.imageUrl}
                                            alt='New Upload'
                                            style={{
                                                borderRadius: 8,
                                                width: '100%', // Ensure the image takes full width
                                                height: '100%', // Ensure the image takes full height of the container
                                                objectFit: 'cover', // Ensure the image covers the full container area
                                            }}
                                        />
                                        {/* Delete button */}
                                        <IconButton
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,
                                                backgroundColor:
                                                    'rgba(255, 255, 255, 0.7)',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'rgba(255, 255, 255, 0.9)',
                                                },
                                                padding: '2px',
                                                m: 0.5,
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the parent box's onClick
                                                handleDeleteImageInNewImages(
                                                    index
                                                );
                                            }}
                                        >
                                            <DeleteIcon
                                                fontSize='small'
                                                sx={{ color: 'error.main' }}
                                            />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Stack>

                            {/* BUTTONS */}
                            <Stack
                                direction='row'
                                spacing={2}
                                justifyContent='flex-end'
                            >
                                <Button
                                    onClick={handleCancelEdit}
                                    color='secondary'
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSaveEditVariant}
                                    variant='contained'
                                    color='primary'
                                    disabled={
                                        isUpdatingVariant ||
                                        !editVariant?.color?.colorId ||
                                        !editVariant.sku ||
                                        (editVariant.productImages.filter(
                                            (img) => img.mainImage
                                        ).length !== 1 &&
                                            newImages.filter(
                                                (img) => img.mainImage
                                            ).length !== 1)
                                    }
                                >
                                    {isUpdatingVariant ? 'Saving...' : 'Save'}
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
