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

const initialCategories = [
    {
        category_id: 1,
        category_name: 'Seating',
        category_description: 'Furniture designed for sitting.',
        image_url: 'https://via.placeholder.com/150',
        created_at: '2023-01-01',
    },
    {
        category_id: 2,
        category_name: 'Tables',
        category_description: 'Furniture designed for working or dining.',
        image_url: 'https://via.placeholder.com/150',
        created_at: '2023-01-02',
    },
];

export default function Categories() {
    const [categories, setCategories] = useState(initialCategories);
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const handleOpen = (category = null) => {
        setEditingCategory(category);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    };

    const handleSave = (category) => {
        if (editingCategory) {
            // Update category
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.category_id === editingCategory.category_id
                        ? category
                        : cat
                )
            );
        } else {
            // Add new category
            const newCategory = { ...category, category_id: Date.now() };
            setCategories((prev) => [...prev, newCategory]);
        }
        handleClose();
    };

    const handleDelete = (categoryId) => {
        setCategories((prev) =>
            prev.filter((cat) => cat.category_id !== categoryId)
        );
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Categories
            </Typography>
            <Button
                variant='contained'
                onClick={() => handleOpen()}
                sx={{ mb: 2 }}
            >
                Add Category
            </Button>

            {/* Categories Table */}
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
                        {categories.map((category) => (
                            <TableRow key={category.category_id}>
                                <TableCell>{category.category_name}</TableCell>
                                <TableCell>
                                    {category.category_description}
                                </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleOpen(category)}
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(category.category_id)
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
                    <CategoryForm
                        category={editingCategory}
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

function CategoryForm({ category, onSave, onCancel }) {
    const [formState, setFormState] = useState(
        category || {
            category_name: '',
            category_description: '',
            image_url: '',
        }
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
                {category ? 'Edit Category' : 'Add Category'}
            </Typography>
            <TextField
                fullWidth
                label='Name'
                name='category_name'
                value={formState.category_name}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Description'
                name='category_description'
                value={formState.category_description}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Image URL'
                name='image_url'
                value={formState.image_url}
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
