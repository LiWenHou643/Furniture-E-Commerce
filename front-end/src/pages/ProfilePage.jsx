// App.js (or ProfilePage.js)
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Input,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import Loading from '../components/Loading';
import useFetchUserProfile from '../hooks/useFetchUserProfile';
import useUpdateProfile from '../hooks/useUpdateProfile';
const ProfilePage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const { data: profileData, isLoading } = useFetchUserProfile();

    if (isLoading) {
        return <Loading />;
    }

    const info = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        email: profileData.email,
        avatar: '',
    };

    const addresses = profileData.addresses;

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container sx={{ mt: 15 }} maxWidth='lg'>
            <Typography
                variant='h4'
                gutterBottom
                sx={{ textAlign: 'center', mb: 5 }}
            >
                My Profile
            </Typography>
            <Grid container spacing={2}>
                {/* Left Sidebar */}
                <Grid item xs={3}>
                    <Paper elevation={0}>
                        <Tabs
                            orientation='vertical'
                            value={selectedTab}
                            onChange={handleTabChange}
                            indicatorColor='primary'
                        >
                            <Tab label='Info' />
                            <Tab label='Addresses' />
                            <Tab label='Password' />
                        </Tabs>
                    </Paper>
                </Grid>

                {/* Main Content */}
                <Grid item xs={9}>
                    <Box sx={{ padding: 0 }}>
                        {selectedTab === 0 && <InfoTab info={info} />}
                        {selectedTab === 1 && (
                            <AddressesTab addresses={addresses} />
                        )}
                        {selectedTab === 2 && <PasswordTab />}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

const InfoTab = ({ info }) => {
    const [avatar, setAvatar] = useState(info.avatar);
    const [firstName, setFirstName] = useState(info.firstName);
    const [lastName, setLastName] = useState(info.lastName);
    const [phoneNumber, setPhone] = useState(info.phoneNumber);
    const [email, setEmail] = useState(info.email);
    const [error, setError] = useState(''); // Error message for invalid file

    const { mutate: updateProfile, isLoading: isUpdatingProfile } =
        useUpdateProfile();

    // Handle file input for avatar upload
    const handleAvatarChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const fileSize = file.size / 1024 / 1024; // Convert size to MB
            const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];

            // Check file size and format
            if (fileSize > 2) {
                setError('File size must be less than 2MB.');
                setAvatar(''); // Reset avatar if invalid file
            } else if (!validFormats.includes(file.type)) {
                setError(
                    'Invalid file format. Only JPG, PNG, and JPEG are allowed.'
                );
                setAvatar(''); // Reset avatar if invalid file
            } else {
                setError(''); // Clear error
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatar(reader.result); // Set the avatar state to the Base64 string of the image
                };
                reader.readAsDataURL(file); // Read the file as a Data URL
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({ avatar, firstName, lastName, phoneNumber, email });

        // Call the updateProfile mutation
        updateProfile({ avatar, firstName, lastName, phoneNumber, email });
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Form Section */}
                    <Grid item xs={12} md={8}>
                        <TextField
                            label='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            fullWidth
                            margin='none'
                            sx={{ marginBottom: 3 }}
                        />
                        <TextField
                            label='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            fullWidth
                            margin='none'
                            sx={{ marginBottom: 3 }}
                        />
                        <TextField
                            label='Phone'
                            value={phoneNumber}
                            onChange={(e) => setPhone(e.target.value)}
                            fullWidth
                            margin='none'
                            sx={{ marginBottom: 3 }}
                        />
                        <TextField
                            label='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin='none'
                            sx={{ marginBottom: 3 }}
                        />
                    </Grid>

                    {/* Avatar Section */}
                    <Grid item xs={12} md={4}>
                        <Box
                            display='flex'
                            justifyContent='center' // Centers the avatar horizontally
                            alignItems='center' // Centers the avatar vertically
                        >
                            <Avatar
                                alt='User Avatar'
                                src={avatar} // If avatar URL exists, it will display that
                                sx={{
                                    width: 100,
                                    height: 100,
                                    bgcolor: 'primary.main', // Background color for initials
                                    fontSize: 20, // Font size for initials
                                }}
                            >
                                {/* If no avatar URL, generate initials */}
                                {(!avatar || avatar === '') && 'PHOTO'}
                            </Avatar>
                        </Box>

                        {/* Avatar Upload */}
                        <Box
                            display='flex'
                            justifyContent='center'
                            marginBottom={2}
                            marginTop={2}
                        >
                            <Input
                                accept='image/*'
                                id='avatar-upload'
                                type='file'
                                onChange={handleAvatarChange}
                                sx={{ display: 'none' }}
                            />
                            <label htmlFor='avatar-upload'>
                                <Button variant='outlined' component='span'>
                                    Upload Avatar
                                </Button>
                            </label>
                        </Box>

                        {/* Note for user about image requirements */}
                        <Box sx={{ px: 6 }}>
                            <Box marginBottom={2}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    Max image size: 2MB.
                                </Typography>
                            </Box>
                            <Box marginBottom={2}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    Accepted formats: JPG, PNG, JPEG.
                                </Typography>
                            </Box>
                        </Box>

                        {/* Error Message */}
                        {error && (
                            <Box
                                display='flex'
                                justifyContent='center'
                                marginBottom={2}
                            >
                                <Typography variant='body2' color='error'>
                                    {error}
                                </Typography>
                            </Box>
                        )}
                    </Grid>

                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={{
                            marginTop: 2,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        disabled={isUpdatingProfile}
                    >
                        {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                    </Button>
                </Grid>
            </form>
        </Box>
    );
};

const AddressesTab = ({ addresses: AddressesArray }) => {
    const [addresses, setAddresses] = useState(AddressesArray);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAddress, setCurrentAddress] = useState({
        streetAddress: '',
        ward: '',
        district: '',
        city: '',
    });

    const handleEditClick = (address) => {
        setCurrentAddress(address);
        setIsEditing(true);
    };

    const handleAddClick = () => {
        setCurrentAddress({
            streetAddress: '',
            ward: '',
            district: '',
            city: '',
        });
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleSave = () => {
        if (currentAddress.addressId) {
            setAddresses((prevAddresses) =>
                prevAddresses.map((address) =>
                    address.addressId === currentAddress.addressId
                        ? currentAddress
                        : address
                )
            );
        } else {
            setAddresses((prevAddresses) => [
                ...prevAddresses,
                { ...currentAddress, addressId: prevAddresses.length + 1 },
            ]);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <Box>
            {/* Add Address Button */}
            <Box display='flex' justifyContent='flex-end' marginBottom={2}>
                <Button
                    variant='contained'
                    color='primary'
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Add Address
                </Button>
            </Box>

            {/* List of addresses */}
            {!isEditing ? (
                <Box>
                    {addresses.map((address) => (
                        <Card key={address.addressId} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Grid container alignItems='center' spacing={2}>
                                    <Grid item xs={10}>
                                        <Typography variant='body1'>
                                            {address.streetAddress}
                                        </Typography>
                                        <Typography variant='body2'>
                                            {address.ward}, {address.district}{' '}
                                            {address.city}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        display='flex'
                                        justifyContent='flex-end'
                                    >
                                        <IconButton
                                            onClick={() =>
                                                handleEditClick(address)
                                            }
                                            sx={{ padding: 0 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                // Address Form for Edit or New Address
                <Box>
                    <TextField
                        label='Street'
                        name='street'
                        value={currentAddress.streetAddress}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='Ward'
                        name='ward'
                        value={currentAddress.ward}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='District'
                        name='district'
                        value={currentAddress.district}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        label='City'
                        name='city'
                        value={currentAddress.city}
                        onChange={handleChange}
                        fullWidth
                        margin='normal'
                    />

                    <Box display='flex' justifyContent='flex-end' marginTop={2}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={handleCancel}
                            sx={{ marginLeft: 2 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

const PasswordTab = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            // Handle password change logic
            console.log('Password changed');
        } else {
            console.log('Passwords do not match');
        }
    };

    return (
        <Box>
            <form onSubmit={handleChangePassword}>
                <TextField
                    label='Old Password'
                    type='password'
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    fullWidth
                    margin='none'
                    sx={{ marginBottom: 3 }}
                />
                <TextField
                    label='New Password'
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    margin='none'
                    sx={{ marginBottom: 3 }}
                />
                <TextField
                    label='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin='none'
                    sx={{ marginBottom: 3 }}
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    sx={{ marginTop: 2 }}
                >
                    Change Password
                </Button>
            </form>
        </Box>
    );
};

export default ProfilePage;
