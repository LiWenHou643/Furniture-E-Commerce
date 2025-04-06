// App.js (or ProfilePage.js)
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import AvatarUploader from '../components/AvatarUploader';
import Loading from '../components/Loading';
import useChangeDefaultAddress from '../hooks/useChangeDefaultAddress';
import useChangePwd from '../hooks/useChangePwd';
import useDeleteAddress from '../hooks/useDeleteAddress';
import useFetchUserProfile from '../hooks/useFetchUserProfile';
import useUpdateAddress from '../hooks/useUpdateAddress';
import useUpdateProfile from '../hooks/useUpdateProfile';
// Import your JSON data
import citiesData from '../data/cities.json';
import districtsData from '../data/districts.json';
import wardsData from '../data/wards.json';

const ProfilePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(0);

    const { data: profileData, isLoading } = useFetchUserProfile();

    useEffect(() => {
        // Sync tab with query parameter on component mount or query change
        const tab = parseInt(searchParams.get('tab'), 10);
        if (!isNaN(tab) && tab >= 0 && tab <= 2) {
            setSelectedTab(tab);
        }
    }, [searchParams]);

    if (isLoading) {
        return <Loading />;
    }

    const info = {
        firstName: profileData?.firstName,
        lastName: profileData?.lastName,
        phoneNumber: profileData?.phoneNumber,
        email: profileData?.email,
        avatar: profileData?.avatar,
    };

    const addresses = profileData?.addresses;

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setSearchParams({ tab: newValue });
    };

    console.log(addresses);

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

    const { mutate: updateProfile, isLoading: isUpdatingProfile } =
        useUpdateProfile();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({ avatar, firstName, lastName, phoneNumber, email });

        // Call the updateProfile mutation
        updateProfile({ avatar, firstName, lastName, phoneNumber, email });
    };

    useEffect(() => {
        setFirstName(info.firstName);
        setLastName(info.lastName);
        setPhone(info.phoneNumber);
        setEmail(info.email);
        setAvatar(info.avatar);
    }, [info]);

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
                            <AvatarUploader />
                        </Box>

                        {/* Note for user about image requirements */}
                        <Box sx={{ px: 6 }}>
                            <Box marginBottom={2}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                >
                                    Max image size: 5MB.
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
        addressId: '',
        streetAddress: '',
        ward: '',
        district: '',
        city: '',
    });

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedCity, setSelectedCity] = useState(currentAddress.city || '');
    const [selectedDistrict, setSelectedDistrict] = useState(
        currentAddress.district || ''
    );
    const [selectedWard, setSelectedWard] = useState(currentAddress.ward || '');
    const [streetAddress, setStreetAddress] = useState(
        currentAddress.streetAddress || ''
    );

    const { mutate: updateAddress } = useUpdateAddress();

    const { mutate: deleteAddress } = useDeleteAddress();

    const { mutate: changeDefaultAddress } = useChangeDefaultAddress();

    useEffect(() => {
        setCities(citiesData); // Load cities on initial render
    }, []);

    useEffect(() => {
        if (currentAddress.city) {
            setSelectedCity(currentAddress.city);
            const filteredDistricts = districtsData.filter(
                (district) => district.parent_code === currentAddress.city
            );
            setDistricts(filteredDistricts);
        }
        if (currentAddress.district) {
            setSelectedDistrict(currentAddress.district);
            const filteredWards = wardsData.filter(
                (ward) => ward.parent_code === currentAddress.district
            );
            setWards(filteredWards);
        }
        if (currentAddress.ward) {
            setSelectedWard(currentAddress.ward);
        }
        setStreetAddress(currentAddress.streetAddress || '');
    }, [currentAddress]);

    useEffect(() => {
        setAddresses(AddressesArray);
    }, [AddressesArray]);

    const handleCityChange = (event) => {
        const cityCode = event.target.value;
        setSelectedCity(cityCode);
        setSelectedDistrict('');
        setSelectedWard('');

        const filteredDistricts = districtsData.filter(
            (district) => district.parent_code === cityCode
        );
        setDistricts(filteredDistricts);
        setWards([]);
    };

    const handleDistrictChange = (event) => {
        const districtCode = event.target.value;
        setSelectedDistrict(districtCode);
        setSelectedWard('');

        const filteredWards = wardsData.filter(
            (ward) => ward.parent_code === districtCode
        );
        setWards(filteredWards);
    };

    const handleWardChange = (event) => {
        setSelectedWard(event.target.value);
    };

    const handleStreetAddressChange = (event) => {
        setStreetAddress(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic

        const addressId = currentAddress.addressId;

        console.log({
            addressId,
            city: selectedCity,
            district: selectedDistrict,
            ward: selectedWard,
            streetAddress: streetAddress,
        });

        // Update the address in the database
        updateAddress(
            {
                addressId,
                city: selectedCity,
                district: selectedDistrict,
                ward: selectedWard,
                streetAddress: streetAddress,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    setCurrentAddress({
                        addressId: '',
                        streetAddress: '',
                        ward: '',
                        district: '',
                        city: '',
                    });
                },
            }
        );
    };

    const handleDelete = (addressId) => {
        // Delete the address in the database
        deleteAddress(addressId);
    };

    // Function to map codes to names
    const getNameFromCode = (code, data) => {
        const item = data.find((item) => item.code === code);
        return item ? item.name : 'Unknown';
    };

    const formatAddress = (address) => {
        const cityName = getNameFromCode(address.city, citiesData);
        const districtName = getNameFromCode(address.district, districtsData);
        const wardName = getNameFromCode(address.ward, wardsData);

        return {
            ...address,
            cityName: cityName,
            districtName: districtName,
            wardName: wardName,
        };
    };

    const formattedAddresses = addresses?.map(formatAddress);

    const handleAddClick = () => {
        setCurrentAddress({
            addressId: '',
            streetAddress: '',
            ward: '',
            district: '',
            city: '',
        });

        setStreetAddress('');
        setSelectedCity('');
        setSelectedDistrict('');
        setSelectedWard('');
        setIsEditing(true);
    };

    const handleEditClick = (address) => {
        setCurrentAddress(address);
        setIsEditing(true);
    };

    const handleSetDefault = (addressId) => {
        const oldDefaultAddress = addresses.find(
            (address) => address.defaultAddress
        );
        changeDefaultAddress({
            oldDefaultAddressId: oldDefaultAddress.addressId,
            newDefaultAddressId: addressId,
        });
    };

    return (
        <Box>
            {/* Add Address Button */}
            <Box display='flex' justifyContent='flex-end' marginBottom={2}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddClick}
                    startIcon={<AddIcon />}
                >
                    Add Address
                </Button>
            </Box>

            {/* No addresses */}
            {formattedAddresses?.length === 0 && (
                <Typography
                    variant='body1'
                    sx={{ marginBottom: 2, textAlign: 'center' }}
                >
                    No addresses found
                </Typography>
            )}

            {/* List of addresses */}
            {!isEditing ? (
                <Box>
                    {formattedAddresses?.map((address) => (
                        <Card key={address.addressId} sx={{ marginBottom: 2 }}>
                            <CardContent>
                                <Grid container alignItems='center' spacing={2}>
                                    <Grid item xs={8}>
                                        <Typography
                                            variant='body1'
                                            component='div' // Change this to 'div' to avoid nesting issues
                                            sx={{ marginBottom: 2 }}
                                        >
                                            {address.streetAddress}

                                            {address.defaultAddress && (
                                                <Chip
                                                    label='Default Address'
                                                    color='primary'
                                                    size='small'
                                                    variant='outlined'
                                                    sx={{
                                                        marginLeft: 1,
                                                        mb: 0.5,
                                                    }}
                                                />
                                            )}
                                        </Typography>

                                        <Typography variant='body2'>
                                            {address.wardName},{' '}
                                            {address.districtName},{' '}
                                            {address.cityName}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={4}
                                        display='flex'
                                        justifyContent='flex-end'
                                    >
                                        {!address.defaultAddress && (
                                            <Button
                                                variant='outlined'
                                                color='primary'
                                                onClick={() =>
                                                    handleSetDefault(
                                                        address.addressId
                                                    )
                                                }
                                            >
                                                Set Default
                                            </Button>
                                        )}
                                        <IconButton
                                            sx={{ padding: 1 }}
                                            color='primary'
                                            onClick={() =>
                                                handleEditClick(address)
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            sx={{ padding: 1 }}
                                            color='error'
                                            onClick={() =>
                                                handleDelete(address.addressId)
                                            }
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                // Address Form for Edit or New Address
                <div>
                    <FormControl fullWidth margin='normal'>
                        <InputLabel>City</InputLabel>
                        <Select
                            value={selectedCity}
                            onChange={handleCityChange}
                            label='City'
                        >
                            {cities?.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        margin='normal'
                        disabled={!districts.length}
                    >
                        <InputLabel>District</InputLabel>
                        <Select
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            label='District'
                        >
                            {districts?.map((district) => (
                                <MenuItem
                                    key={district.code}
                                    value={district.code}
                                >
                                    {district.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        fullWidth
                        margin='normal'
                        disabled={!wards.length}
                    >
                        <InputLabel>Ward</InputLabel>
                        <Select
                            value={selectedWard}
                            onChange={handleWardChange}
                            label='Ward'
                        >
                            {wards?.map((ward) => (
                                <MenuItem key={ward.code} value={ward.code}>
                                    {ward.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin='normal'
                        label='Street Address'
                        value={streetAddress}
                        onChange={handleStreetAddressChange}
                        placeholder='Enter your street address'
                    />

                    <Box
                        display='flex'
                        justifyContent='center'
                        marginTop={2}
                        gap={2}
                    >
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                        >
                            Save Address
                        </Button>

                        <Button
                            type='cancel'
                            variant='outlined'
                            color='primary'
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </div>
            )}
        </Box>
    );
};

const PasswordTab = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate: changePassword, isLoading } = useChangePwd();

    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            changePassword({ oldPassword, newPassword });
        } else {
            toast.error('Passwords do not match');
        }
    };

    return (
        <Box>
            <form onSubmit={handleChangePassword}>
                {/* Old Password */}
                <TextField
                    label='Old Password'
                    type={showOldPassword ? 'text' : 'password'} // Toggle password visibility
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    fullWidth
                    margin='none'
                    sx={{ marginBottom: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() =>
                                        setShowOldPassword((prev) => !prev)
                                    }
                                    edge='end'
                                >
                                    {showOldPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* New Password */}
                <TextField
                    label='New Password'
                    type={showNewPassword ? 'text' : 'password'} // Toggle password visibility
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    margin='none'
                    sx={{ marginBottom: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() =>
                                        setShowNewPassword((prev) => !prev)
                                    }
                                    edge='end'
                                >
                                    {showNewPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Confirm Password */}
                <TextField
                    label='Confirm Password'
                    type={showConfirmPassword ? 'text' : 'password'} // Toggle password visibility
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin='none'
                    sx={{ marginBottom: 3 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    onClick={() =>
                                        setShowConfirmPassword((prev) => !prev)
                                    }
                                    edge='end'
                                >
                                    {showConfirmPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Submit Button */}
                <Button
                    variant='contained'
                    color='primary'
                    sx={{ marginTop: 2 }}
                    onClick={handleChangePassword}
                    disabled={isLoading}
                >
                    {isLoading ? 'Changing...' : 'Change Password'}
                </Button>
            </form>
        </Box>
    );
};

export default ProfilePage;
