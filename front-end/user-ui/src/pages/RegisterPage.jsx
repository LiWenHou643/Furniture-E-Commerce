import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useRegister from '../hooks/useRegister';
// Validation Schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'First name is too short')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name is too short')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { mutate: register, isLoading, error } = useRegister();
    const handleSubmit = (values) => {
        const data = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            password: values.password,
            confirmPassword: values.confirmPassword,
        };

        console.log('Form values', data);

        register(data);
    };

    return (
        <Container
            maxWidth='md'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
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
                    Register Account
                </Typography>

                {/* Error when register */}
                {error && (
                    <Typography
                        variant='body2'
                        sx={{ color: 'red', marginBottom: 2 }}
                    >
                        {error?.response?.data?.message}
                    </Typography>
                )}

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isValid, dirty }) => (
                        <Form>
                            {/* First Name and Last Name in 1 row */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='firstName'
                                        as={TextField}
                                        label='First Name'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='firstName' />
                                        }
                                        error={
                                            touched.firstName &&
                                            Boolean(errors.firstName)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='lastName'
                                        as={TextField}
                                        label='Last Name'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='lastName' />
                                        }
                                        error={
                                            touched.lastName &&
                                            Boolean(errors.lastName)
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Email and Phone in 1 row */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='email'
                                        as={TextField}
                                        label='Email'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='email' />
                                        }
                                        error={
                                            touched.email &&
                                            Boolean(errors.email)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='phoneNumber'
                                        as={TextField}
                                        label='Phone Number'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='phoneNumber' />
                                        }
                                        error={
                                            touched.phoneNumber &&
                                            Boolean(errors.phoneNumber)
                                        }
                                    />
                                </Grid>
                            </Grid>

                            {/* Password and Confirm Password in 1 row */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='password'
                                        as={TextField}
                                        type={
                                            showPassword ? 'text' : 'password'
                                        } // Toggle visibility
                                        label='Password'
                                        variant='outlined'
                                        fullWidth
                                        required
                                        sx={{ marginBottom: 2 }}
                                        helperText={
                                            <ErrorMessage name='password' />
                                        }
                                        error={
                                            touched.password &&
                                            Boolean(errors.password)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        edge='end'
                                                    >
                                                        {showPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>

                                {/* Confirm Password Field */}
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='confirmPassword'
                                        as={TextField}
                                        type={
                                            showConfirmPassword
                                                ? 'text'
                                                : 'password'
                                        } // Toggle visibility
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
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position='end'>
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowConfirmPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                        edge='end'
                                                    >
                                                        {showConfirmPassword ? (
                                                            <Visibility />
                                                        ) : (
                                                            <VisibilityOff />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Submit Button */}
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                type='submit'
                                disabled={!dirty || !isValid || isLoading} // Disable button until terms are checked
                            >
                                {isLoading ? 'Loading...' : 'Register'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default RegisterPage;
