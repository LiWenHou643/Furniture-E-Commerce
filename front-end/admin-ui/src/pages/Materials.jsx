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
import useAddMaterial from '../hooks/useAddMaterial';
import useDeleteMaterial from '../hooks/useDeleteMaterial';
import useFetchMaterial from '../hooks/useFetchMaterial';

export default function Materials() {
    const [open, setOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);
    const { data: materials, isLoading, error } = useFetchMaterial();
    const { mutate: addMaterial, isLoading: isSaving } = useAddMaterial();
    const { mutate: deleteMaterial } = useDeleteMaterial();

    if (isLoading) return <Loading />;

    if (error) return <Error error={error} />;
    const handleOpen = (material = null) => {
        setEditingMaterial(material);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingMaterial(null);
    };

    const handleSave = (material) => {
        if (editingMaterial) {
            // Update material
            addMaterial(
                { ...material, materialId: editingMaterial.materialId },
                {
                    onSettled: () => {
                        handleClose();
                    },
                }
            );
        } else {
            // Add new material
            const newMaterial = { ...material };

            addMaterial(newMaterial, {
                onSettled: () => {
                    handleClose();
                },
            });
        }
        handleClose();
    };

    const handleDelete = (materialId) => {
        if (window.confirm('Are you sure you want to delete this material?')) {
            deleteMaterial(materialId);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Materials
            </Typography>
            <Button
                variant='contained'
                onClick={() => handleOpen()}
                sx={{ mb: 2 }}
            >
                Add Material
            </Button>

            {/* Materials Table */}
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
                        {materials.map((material) => (
                            <TableRow key={material.materialId}>
                                <TableCell>{material.materialName}</TableCell>
                                <TableCell>
                                    {material.materialDescription}
                                </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleOpen(material)}
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(material.materialId)
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
                    <MaterialForm
                        material={editingMaterial}
                        isSaving={isSaving}
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

function MaterialForm({ material, onSave, onCancel, isSaving }) {
    const [formState, setFormState] = useState(
        material || { materialName: '', materialDescription: '' }
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
                {material ? 'Edit Material' : 'Add Material'}
            </Typography>
            <TextField
                fullWidth
                label='Name'
                name='materialName'
                value={formState.materialName}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Description'
                name='materialDescription'
                value={formState.materialDescription}
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
