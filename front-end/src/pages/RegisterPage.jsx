import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

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
    terms: Yup.bool()
        .oneOf([true], 'You must agree to the terms and conditions')
        .required('Terms and conditions must be accepted'),
});

const RegisterPage = () => {
    const handleSubmit = (values) => {
        console.log('Form values', values);
        // Handle form submission (e.g., send to backend)
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
                    Register
                </Typography>

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        confirmPassword: '',
                        terms: false, // Initial value for terms checkbox
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, isValid, dirty, values }) => (
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
                                        type='password'
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

                            {/* Terms & Conditions Checkbox */}
                            <FormControlLabel
                                control={
                                    <Field
                                        name='terms'
                                        type='checkbox'
                                        as={Checkbox}
                                        color='primary'
                                        checked={values.terms}
                                    />
                                }
                                label='I agree to the terms and conditions'
                                sx={{ marginBottom: 2 }}
                            />
                            <ErrorMessage
                                name='terms'
                                component='div'
                                style={{ color: 'red', marginBottom: 8 }}
                            />

                            {/* Submit Button */}
                            <Button
                                variant='contained'
                                color='primary'
                                fullWidth
                                type='submit'
                                disabled={!dirty || !isValid || !values.terms} // Disable button until terms are checked
                            >
                                Register
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default RegisterPage;
