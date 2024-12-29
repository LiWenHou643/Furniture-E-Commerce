import { PhotoCamera } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    address: Yup.string()
        .min(10, 'Address is too short')
        .required('Address is required'),
    oldPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Old password is required'),
    newPassword: Yup.string()
        .min(8, 'New password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const ProfilePage = () => {
    const [avatar, setAvatar] = useState(null); // Avatar state
    const [firstName, setFirstName] = useState('John'); // Example first name
    const [lastName, setLastName] = useState('Wick'); // Example last name

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (values) => {
        console.log('Form values', values);
        // Handle form submission (e.g., send to backend)
    };

    // Function to get the initials based on first and last name
    const getInitials = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`.toUpperCase(); // Concatenate first letters of first and last name
    };

    return (
        <Container
            maxWidth='md'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
            }}
        >
            <Box
                sx={{
                    padding: 3,
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    width: '100%',
                }}
            >
                <Typography variant='h5' sx={{ marginBottom: 2 }}>
                    Manage Profile
                </Typography>

                {/* Avatar Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 3,
                    }}
                >
                    <Avatar
                        alt='Profile Picture'
                        src={avatar || ''} // Only show image if `avatar` is not null
                        sx={{ width: 100, height: 100 }}
                    >
                        {/* If no image, show initials */}
                        {!avatar && getInitials(firstName, lastName)}
                    </Avatar>
                    <label htmlFor='avatar-upload'>
                        <IconButton
                            color='primary'
                            component='span'
                            sx={{ marginLeft: 2 }}
                        >
                            <PhotoCamera />
                        </IconButton>
                    </label>
                    <input
                        id='avatar-upload'
                        type='file'
                        accept='image/*'
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                </Box>

                <Formik
                    initialValues={{
                        address: '',
                        oldPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isValid, dirty }) => (
                        <Form>
                            {/* Address Section */}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        name='address'
                                        as={TextField}
                                        label='Address'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        multiline
                                        rows={4}
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='address' />
                                        }
                                        error={
                                            touched.address &&
                                            Boolean(errors.address)
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Password Section */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='oldPassword'
                                        as={TextField}
                                        type='password'
                                        label='Old Password'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='oldPassword' />
                                        }
                                        error={
                                            touched.oldPassword &&
                                            Boolean(errors.oldPassword)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='newPassword'
                                        as={TextField}
                                        type='password'
                                        label='New Password'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='newPassword' />
                                        }
                                        error={
                                            touched.newPassword &&
                                            Boolean(errors.newPassword)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='confirmPassword'
                                        as={TextField}
                                        type='password'
                                        label='Confirm Password'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='confirmPassword' />
                                        }
                                        error={
                                            touched.confirmPassword &&
                                            Boolean(errors.confirmPassword)
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Submit Button */}
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                type='submit'
                                disabled={!dirty || !isValid}
                            >
                                Save Changes
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default ProfilePage;
