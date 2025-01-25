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

const initialMaterials = [
    {
        material_id: 1,
        material_name: 'Fabric',
        material_description:
            'Soft materials like cotton, linen, or polyester used for upholstery.',
        created_at: '2023-01-01',
    },
    {
        material_id: 2,
        material_name: 'Wood',
        material_description:
            'Hard material commonly used in furniture making.',
        created_at: '2023-01-02',
    },
];

export default function Materials() {
    const [materials, setMaterials] = useState(initialMaterials);
    const [open, setOpen] = useState(false);
    const [editingMaterial, setEditingMaterial] = useState(null);

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
            setMaterials((prev) =>
                prev.map((mat) =>
                    mat.material_id === editingMaterial.material_id
                        ? material
                        : mat
                )
            );
        } else {
            // Add new material
            const newMaterial = { ...material, material_id: Date.now() };
            setMaterials((prev) => [...prev, newMaterial]);
        }
        handleClose();
    };

    const handleDelete = (materialId) => {
        setMaterials((prev) =>
            prev.filter((mat) => mat.material_id !== materialId)
        );
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
                            <TableRow key={material.material_id}>
                                <TableCell>{material.material_name}</TableCell>
                                <TableCell>
                                    {material.material_description}
                                </TableCell>
                                <TableCell>
                                    <EditIcon
                                        onClick={() => handleOpen(material)}
                                        color='success'
                                        sx={{ mr: 2, cursor: 'pointer' }}
                                    />
                                    <DeleteIcon
                                        onClick={() =>
                                            handleDelete(material.material_id)
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
                        onSave={handleSave}
                        onCancel={handleClose}
                    />
                </Box>
            </Modal>
        </Box>
    );
}

function MaterialForm({ material, onSave, onCancel }) {
    const [formState, setFormState] = useState(
        material || { material_name: '', material_description: '' }
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
                name='material_name'
                value={formState.material_name}
                onChange={handleChange}
                margin='normal'
            />
            <TextField
                fullWidth
                label='Description'
                name='material_description'
                value={formState.material_description}
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
