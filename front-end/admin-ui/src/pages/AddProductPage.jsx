import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
    Avatar,
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
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

import CustomTooltip from '../components/CustomTooltip';
import Error from '../components/Error';
import Loading from '../components/Loading';
import useAddColor from '../hooks/useAddColor';
import useFetchColor from '../hooks/useFetchColor';

const emptyProduct = {
    productName: '',
    productDescription: '',
    productItems: [],
};

export default function AddProductPage() {
    const [product, setProduct] = useState(emptyProduct);
    const [openAddColorModal, setOpenAddColorModal] = useState(false);
    const [newColor, setNewColor] = useState({
        colorName: '',
        hexCode: '#000000',
    });

    const { data: colors, isLoading, error } = useFetchColor();
    const { mutate: addColor } = useAddColor();

    if (isLoading) return <Loading />;

    if (error) return <Error error={error} />;

    const handleAddVariant = () => {
        setProduct((prev) => ({
            ...prev,
            productItems: [
                ...prev.productItems,
                {
                    productItemId: Date.now(),
                    color: { colorName: '', hexCode: '' },
                    sku: '',
                    originalPrice: 0,
                    salePrice: 0,
                    stockQuantity: 0,
                    productImages: [],
                },
            ],
        }));
    };

    const handleVariantChange = (id, field, value) => {
        setProduct((prev) => ({
            ...prev,
            productItems: prev.productItems.map((item) =>
                item.productItemId === id ? { ...item, [field]: value } : item
            ),
        }));
    };

    const handleDeleteImage = (itemId, imageId) => {
        setProduct((prev) => ({
            ...prev,
            productItems: prev.productItems.map((item) =>
                item.productItemId === itemId
                    ? {
                          ...item,
                          productImages: item.productImages.filter(
                              (img) => img.imageId !== imageId
                          ),
                      }
                    : item
            ),
        }));
    };

    const handleSetMainImage = (itemId, imageId) => {
        setProduct((prev) => ({
            ...prev,
            productItems: prev.productItems.map((item) =>
                item.productItemId === itemId
                    ? {
                          ...item,
                          productImages: item.productImages.map((img) => ({
                              ...img,
                              mainImage: img.imageId === imageId,
                          })),
                      }
                    : item
            ),
        }));
    };

    const handleImageUpload = (itemId, files) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const previewUrl = e.target.result;

            setProduct((prev) => ({
                ...prev,
                productItems: prev.productItems.map((item) =>
                    item.productItemId === itemId
                        ? {
                              ...item,
                              productImages: [
                                  ...item.productImages,
                                  {
                                      imageId: Date.now(),
                                      file, // Store the actual file for submission
                                      previewUrl, // Store the preview URL for display
                                      mainImage:
                                          item.productImages.length === 0, // Automatically set the first image as main
                                  },
                              ],
                          }
                        : item
                ),
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSaveProduct = () => {
        console.log('Saving product:', product);
        alert('Product saved successfully!');
        setProduct(emptyProduct);
    };

    const handleSelectColor = (itemId, color) => {
        setProduct((prev) => ({
            ...prev,
            productItems: prev.productItems.map((item) =>
                item.productItemId === itemId ? { ...item, color } : item
            ),
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

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Add New Product
            </Typography>

            {/* Product Info */}
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label='Product Name'
                    value={product.productName}
                    onChange={(e) =>
                        setProduct((prev) => ({
                            ...prev,
                            productName: e.target.value,
                        }))
                    }
                    margin='normal'
                    required
                />
                <TextField
                    fullWidth
                    label='Description'
                    value={product.productDescription}
                    onChange={(e) =>
                        setProduct((prev) => ({
                            ...prev,
                            productDescription: e.target.value,
                        }))
                    }
                    margin='normal'
                    multiline
                    rows={4}
                />
            </Box>

            {/* Product Variants */}
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
                            <TableCell>Images</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {product.productItems.map((item) => (
                            <TableRow key={item.productItemId}>
                                <TableCell>
                                    <Box>
                                        <Typography variant='body2'>
                                            Select Color:{' '}
                                            {item.color.colorName && (
                                                <Typography
                                                    component='span'
                                                    variant='body2'
                                                    sx={{
                                                        mt: 1,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {item.color.colorName}
                                                </Typography>
                                            )}
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 1,
                                                width: 250,
                                                mt: 1,
                                            }}
                                        >
                                            {colors?.map((color) => (
                                                <CustomTooltip
                                                    key={color.colorId}
                                                    title={color.colorName}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            backgroundColor:
                                                                color.hexCode,
                                                            borderRadius: '50%',
                                                            cursor: 'pointer',
                                                            border:
                                                                item.color
                                                                    .colorId ===
                                                                color.colorId
                                                                    ? '3px solid #000'
                                                                    : '1px solid #ddd',
                                                        }}
                                                        onClick={() =>
                                                            handleSelectColor(
                                                                item.productItemId,
                                                                color
                                                            )
                                                        }
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
                                                        justifyContent:
                                                            'center',
                                                        backgroundColor:
                                                            '#f0f0f0',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                        border: '1px solid #ddd',
                                                    }}
                                                    onClick={() =>
                                                        setOpenAddColorModal(
                                                            true
                                                        )
                                                    }
                                                >
                                                    +
                                                </Box>
                                            </CustomTooltip>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label='SKU'
                                        value={item.sku}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                item.productItemId,
                                                'sku',
                                                e.target.value
                                            )
                                        }
                                        size='small'
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label='Original Price'
                                        value={item.originalPrice}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                item.productItemId,
                                                'originalPrice',
                                                e.target.value
                                            )
                                        }
                                        size='small'
                                        type='number'
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label='Sale Price'
                                        value={item.salePrice}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                item.productItemId,
                                                'salePrice',
                                                e.target.value
                                            )
                                        }
                                        size='small'
                                        type='number'
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        label='Stock'
                                        value={item.stockQuantity}
                                        onChange={(e) =>
                                            handleVariantChange(
                                                item.productItemId,
                                                'stockQuantity',
                                                e.target.value
                                            )
                                        }
                                        size='small'
                                        type='number'
                                    />
                                </TableCell>
                                <TableCell sx={{ width: '25%' }}>
                                    <Box>
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
                                                    handleImageUpload(
                                                        item.productItemId,
                                                        e.target.files
                                                    )
                                                }
                                            />
                                        </Button>
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
                                            {item.productImages.map((img) => (
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
                                                        handleSetMainImage(
                                                            item.productItemId,
                                                            img.imageId
                                                        )
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
                                                            position:
                                                                'absolute',
                                                            top: -10,
                                                            right: -10,
                                                            bgcolor: 'white',
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteImage(
                                                                item.productItemId,
                                                                img.imageId
                                                            );
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize='small' />
                                                    </IconButton>
                                                    {img.mainImage && (
                                                        <Typography
                                                            sx={{
                                                                position:
                                                                    'absolute',
                                                                bottom: 2,
                                                                left: '50%',
                                                                transform:
                                                                    'translateX(-50%)',
                                                                bgcolor:
                                                                    'rgba(0, 0, 0, 0.6)',
                                                                color: 'white',
                                                                fontSize:
                                                                    '0.75rem',
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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

            {/* Save Button */}
            <Box sx={{ mt: 4 }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSaveProduct}
                    disabled={
                        !product.productName || !product.productDescription
                    }
                >
                    Save Product
                </Button>
            </Box>
        </Box>
    );
}
