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

const initialBrands = [
    {
        brand_id: 1,
        brand_name: 'Herman Miller',
        brand_description:
            'Renowned for ergonomic and functional office furniture.',
        created_at: '2023-01-01',
    },
    {
        brand_id: 2,
        brand_name: 'Ikea',
        brand_description:
            'Popular Swedish brand for affordable and modern furniture.',
        created_at: '2023-01-02',
    },
];

export default function Brands() {
    const [brands, setBrands] = useState(initialBrands);
    const [open, setOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);

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
            // Update brand
            setBrands((prev) =>
                prev.map((b) =>
                    b.brand_id === editingBrand.brand_id ? brand : b
                )
            );
        } else {
            // Add new brand
            const newBrand = { ...brand, brand_id: Date.now() };
            setBrands((prev) => [...prev, newBrand]);
        }
        handleClose();
    };

    const handleDelete = (brandId) => {
        setBrands((prev) => prev.filter((b) => b.brand_id !== brandId));
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
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.map((brand) => (
                            <TableRow key={brand.brand_id}>
                                <TableCell>{brand.brand_name}</TableCell>
                                <TableCell>{brand.brand_description}</TableCell>
                                <TableCell>{brand.created_at}</TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleOpen(brand)}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(brand.brand_id)
                                        }
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
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

function BrandForm({ brand, onSave, onCancel }) {
    const [formState, setFormState] = useState(
        brand || { brand_name: '', brand_description: '' }
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
                name='brand_name'
                value={formState.brand_name}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Description'
                name='brand_description'
                value={formState.brand_description}
                onChange={handleChange}
                margin='normal'
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={onCancel} sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleSubmit}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}
