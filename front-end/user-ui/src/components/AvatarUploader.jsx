import { Cancel, Crop, Save } from '@mui/icons-material';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Modal,
} from '@mui/material';
import { useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import useUploadAvatar from '../hooks/useUploadAvatar';

function AvatarUploader() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [previewModalOpen, setPreviewModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editor, setEditor] = useState(null);
    const [scale, setScale] = useState(1);

    const { mutate: uploadAvatar, isLoading } = useUploadAvatar();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFile(file);
            setPreviewModalOpen(true);
        }
    };

    const handleSaveEdit = () => {
        if (editor) {
            const canvas = editor.getImageScaledToCanvas();
            canvas.toBlob((blob) => {
                const updatedFile = new File([blob], 'avatar.png', {
                    type: 'image/png',
                });
                setPreview(URL.createObjectURL(blob)); // Update preview with the blob URL
                setFile(updatedFile);
                setPreviewModalOpen(true);
                setEditModalOpen(false);
            }, 'image/png');
        }
    };

    const handleUpload = async () => {
        if (!file) {
            console.error('No file to upload.');
            return;
        }

        await uploadAvatar(file);
    };

    return (
        <div>
            <input
                type='file'
                accept='image/*'
                id='upload-avatar'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor='upload-avatar'>
                <Button variant='outlined' component='span'>
                    Change Avatar
                </Button>
            </label>

            {/* Preview Modal */}
            <Dialog
                open={previewModalOpen}
                onClose={() => setPreviewModalOpen(false)}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>Preview Avatar</DialogTitle>
                <DialogContent
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component='img'
                        src={preview}
                        alt='Preview'
                        sx={{
                            width: '400px', // Set a fixed width
                            height: '400px', // Set a fixed height to make it square
                            objectFit: 'cover', // Ensure the image fills the square without distorting
                            borderRadius: '50%', // This will make it circular
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <Button
                        startIcon={<Crop />}
                        onClick={() => {
                            setPreviewModalOpen(false);
                            setEditModalOpen(true);
                        }}
                        disabled={isLoading}
                    >
                        Edit
                    </Button>
                    <Button
                        startIcon={<Save />}
                        disabled={isLoading}
                        onClick={handleUpload}
                    >
                        {isLoading ? 'Uploading...' : 'Upload'}
                    </Button>
                    <Button
                        startIcon={<Cancel />}
                        onClick={() => setPreviewModalOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Modal */}
            <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                    }}
                >
                    <AvatarEditor
                        ref={setEditor}
                        image={file}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        rotate={0}
                    />
                    <Box sx={{ p: 2 }}>
                        <Box>
                            <Button
                                onClick={() => setScale((prev) => prev + 0.1)}
                            >
                                Zoom In
                            </Button>
                            <Button
                                onClick={() => setScale((prev) => prev - 0.1)}
                            >
                                Zoom Out
                            </Button>
                        </Box>
                        <Button
                            startIcon={<Save />}
                            variant='contained'
                            sx={{ mt: 2 }}
                            onClick={handleSaveEdit}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AvatarUploader;
