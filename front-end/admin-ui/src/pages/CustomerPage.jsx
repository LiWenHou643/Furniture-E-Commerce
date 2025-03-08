import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Pagination,
    Paper,
    Stack,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import useFetchCustomers from '../hooks/useFetchCustomers';
import useToggleUserStatus from '../hooks/useToggleUserStatus';
import useUpdateUser from '../hooks/useUpdateUser'; // Import the hook for updating user info

const CustomerPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const [openModal, setOpenModal] = useState(false); // To control modal visibility
    const [userIdToToggle, setUserIdToToggle] = useState(null); // To store the user ID for toggling
    const { data: customers, isLoading } = useFetchCustomers({
        page: currentPage - 1,
        size: 8,
    });
    const { mutate } = useToggleUserStatus();
    const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();

    // State for edit user modal
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    if (isLoading) {
        return <Loading />;
    }

    // Calculate the page range based on the current page and total items
    const handlePageChange = (event, page) => {
        const currentParams = Object.fromEntries(searchParams.entries()); // Get all current search parameters
        const updatedParams = { ...currentParams, page: page.toString() }; // Merge with the new page number
        setSearchParams(updatedParams); // Update the search params
        navigate(`?${new URLSearchParams(updatedParams).toString()}`); // Optionally navigate to the updated URL
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleToggleUserStatus = (userId) => {
        // Trigger the mutation to change user status
        mutate(userId);
        setOpenModal(false); // Close the modal after confirming the change
    };

    const handleSwitchChange = (userId) => {
        // Show confirmation modal instead of immediately toggling the switch
        setUserIdToToggle(userId);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setUserIdToToggle(null); // Clear the stored userId when modal is closed
    };

    // Handle opening edit modal
    const handleOpenEditModal = (user) => {
        setSelectedUser({ ...user });
        setOpenEditModal(true);
    };

    // Handle closing edit modal
    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedUser(null);
    };

    // Handle user information change
    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle save user changes
    const handleSaveUserChanges = () => {
        if (selectedUser) {
            updateUser(selectedUser, {
                onSuccess: () => {
                    handleCloseEditModal();
                },
            });
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Customers Management
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Avatar</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers?.content?.map((customer) => (
                            <TableRow key={customer.userId}>
                                {/* User ID */}
                                <TableCell>{customer.userId}</TableCell>

                                {/* Avatar */}
                                <TableCell>
                                    <Avatar
                                        src={customer.avatar || ''}
                                        alt={customer.firstName}
                                    />
                                </TableCell>

                                {/* Full Name */}
                                <TableCell>
                                    <Typography>
                                        {customer.firstName} {customer.lastName}
                                    </Typography>
                                </TableCell>

                                {/* Email */}
                                <TableCell>{customer.email}</TableCell>

                                {/* Phone Number */}
                                <TableCell>{customer.phoneNumber}</TableCell>

                                {/* User Status */}
                                <TableCell>
                                    <Switch
                                        checked={customer.userStatus}
                                        color='primary'
                                        onChange={() =>
                                            handleSwitchChange(customer.userId)
                                        }
                                    />
                                </TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <Tooltip title='Edit'>
                                        <IconButton
                                            color='primary'
                                            onClick={() =>
                                                handleOpenEditModal(customer)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            {
                // Display pagination component only if there are more than 1 page
                customers?.page?.totalPages > 1 && (
                    <Stack
                        spacing={2}
                        direction='row'
                        justifyContent='center'
                        sx={{ marginTop: 3 }}
                    >
                        <Pagination
                            count={Math.ceil(customers?.page?.totalPages)} // Total pages
                            page={currentPage}
                            onChange={handlePageChange}
                            color='primary'
                        />
                    </Stack>
                )
            }

            {/* Confirmation Modal for Status Toggle */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Confirm User Status Change</DialogTitle>
                <DialogContent>
                    Are you sure you want to change the user status?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseModal}
                        color='primary'
                        variant='outlined'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleToggleUserStatus(userIdToToggle)}
                        color='primary'
                        variant='contained'
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog
                open={openEditModal}
                onClose={handleCloseEditModal}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>Edit User Information</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    mb: 2,
                                }}
                            >
                                <Avatar
                                    src={selectedUser.avatar || ''}
                                    alt={selectedUser.firstName}
                                    sx={{ width: 80, height: 80 }}
                                />
                            </Box>

                            <TextField
                                name='firstName'
                                label='First Name'
                                value={selectedUser.firstName || ''}
                                onChange={handleUserInfoChange}
                                fullWidth
                            />

                            <TextField
                                name='lastName'
                                label='Last Name'
                                value={selectedUser.lastName || ''}
                                onChange={handleUserInfoChange}
                                fullWidth
                            />

                            <TextField
                                name='email'
                                label='Email'
                                value={selectedUser.email || ''}
                                onChange={handleUserInfoChange}
                                fullWidth
                                type='email'
                            />

                            <TextField
                                name='phoneNumber'
                                label='Phone Number'
                                value={selectedUser.phoneNumber || ''}
                                onChange={handleUserInfoChange}
                                fullWidth
                            />
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color='secondary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveUserChanges}
                        color='primary'
                        variant='contained'
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomerPage;
