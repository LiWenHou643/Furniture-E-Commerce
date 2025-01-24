import {
    Box,
    Button,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function ProductForm({ product, onCancel, onSave }) {
    const [formState, setFormState] = useState(
        product || {
            productName: '',
            productDescription: '',
            category: '',
            brand: '',
            material: '',
            areas: [],
            productItems: [],
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formState);
    };

    return (
        <Box>
            <Typography variant='h6' gutterBottom>
                {product ? 'Edit Product' : 'Add Product'}
            </Typography>
            <TextField
                fullWidth
                label='Name'
                name='productName'
                value={formState.productName}
                onChange={handleChange}
                margin='dense'
            />
            <TextField
                fullWidth
                label='Description'
                name='productDescription'
                value={formState.productDescription}
                onChange={handleChange}
                margin='dense'
            />
            <Select
                fullWidth
                name='category'
                value={formState.category}
                onChange={handleChange}
                margin='dense'
            >
                <MenuItem value='Seating'>Seating</MenuItem>
                <MenuItem value='Tables'>Tables</MenuItem>
            </Select>
            {/* Add more fields and areas */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button onClick={onCancel} sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button variant='contained' onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </Box>
    );
}
