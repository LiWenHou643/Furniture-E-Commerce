import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const LoginPage = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here (validate form, authenticate user, etc.)
        console.log('Email or Phone:', emailOrPhone);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);
    };

    return (
        <Container
            maxWidth='xs'
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
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Email or Phone Number'
                        variant='outlined'
                        fullWidth
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        variant='outlined'
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                                color='primary'
                            />
                        }
                        label='Remember me'
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        variant='contained'
                        color='primary'
                        fullWidth
                        type='submit'
                    >
                        Log In
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
