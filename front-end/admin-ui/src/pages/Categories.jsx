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
import useAddCategory from '../hooks/useAddCategory';
import useDeleteCategory from '../hooks/useDeleteCategory';
import useFetchCategory from '../hooks/useFetchCategory';

export default function Categories() {
    const [open, setOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const { data: categories, isLoading, error } = useFetchCategory();
    const { mutate: addCategory, isLoading: isSaving } = useAddCategory();
    const { mutate: deleteCategory } = useDeleteCategory();

    if (isLoading) return <Loading />;

    if (error) return <Error error={error} />;

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
            const updatedCategory = {
                ...category,
                categoryId: editingCategory.categoryId,
            };

            // Call update category API
            addCategory(updatedCategory, {
                onSettled: () => {
                    handleClose();
                },
            });
        } else {
            // Add new category
            const newCategory = { ...category };

            // Call add category API
            addCategory(newCategory, {
                onSettled: () => {
                    handleClose();
                },
            });
        }
    };

    const handleDelete = (categoryId) => {
        // Call delete category API
        if (window.confirm('Are you sure you want to delete this category?'))
            deleteCategory(categoryId);
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
                            <TableRow key={category.categoryId}>
                                <TableCell>{category.categoryName}</TableCell>
                                <TableCell>
                                    {category.categoryDescription}
                                </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleOpen(category)}
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(category.categoryId)
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
                        isSaving={isSaving}
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

function CategoryForm({ category, onSave, onCancel, isSaving }) {
    const [formState, setFormState] = useState(
        category || {
            categoryName: '',
            categoryDescription: '',
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
                name='categoryName'
                value={formState.categoryName}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Description'
                name='categoryDescription'
                value={formState.categoryDescription}
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
