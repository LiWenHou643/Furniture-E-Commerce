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
import Error from '../components/Error';
import Loading from '../components/Loading';
import useAddBrand from '../hooks/useAddBrand';
import useFetchBrand from '../hooks/useFetchBrand';

export default function Brands() {
    // const [brands, setBrands] = useState(initialBrands);
    const [open, setOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);

    const { data: brands, isLoading, error } = useFetchBrand();
    const { mutate: addBrand, isLoading: isSaving } = useAddBrand();

    if (isLoading) return <Loading />;

    if (error) return <Error error={error} />;

    const handleOpen = (brand = null) => {
        setEditingBrand(brand);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingBrand(null);
    };

    const handleSave = (brand) => {
        if (editingBrand) {
            addBrand(
                { ...brand, brand_id: editingBrand.brand_id },
                {
                    onSettled: () => {
                        handleClose();
                    },
                }
            );
        } else {
            // Add new brand
            addBrand(brand, {
                onSettled: () => {
                    handleClose();
                },
            });
        }
    };

    const handleDelete = (brandId) => {
        console.log('Delete brand:', brandId);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Brands
            </Typography>
            <Button
                variant='contained'
                onClick={() => handleOpen()}
                sx={{ mb: 2 }}
            >
                Add Brand
            </Button>

            {/* Brands Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Description
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.map((brand) => (
                            <TableRow key={brand.brandId}>
                                <TableCell>{brand.brandName}</TableCell>
                                <TableCell>{brand.brandDescription}</TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleOpen(brand)}
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(brand.brand_id)
                                        }
                                        color='error'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Modal */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <BrandForm
                        brand={editingBrand}
                        isSaving={isSaving}
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

function BrandForm({ brand, onSave, onCancel, isSaving }) {
    const [formState, setFormState] = useState(
        brand || { brandName: '', brandDescription: '' }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formState);
    };

    return (
        <Box>
            <Typography variant='h6'>
                {brand ? 'Edit Brand' : 'Add Brand'}
            </Typography>
            <TextField
                fullWidth
                label='Name'
                name='brandName'
                value={formState.brandName}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Description'
                name='brandDescription'
                value={formState.brandDescription}
                onChange={handleChange}
                margin='normal'
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={onCancel} sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    onClick={handleSubmit}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </Box>
        </Box>
    );
}
