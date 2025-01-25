import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { isAdmin, isAuthenticated } from '../utils/auth';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated() && isAdmin()) {
            navigate('/'); // Redirect to homepage if already logged in
        }
    }, [navigate]);

    const loginMutation = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call the login mutation
        loginMutation.mutate({ username, password, persistent: true });
    };

    return (
        <Container
            maxWidth='xs'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Typography variant='h4' sx={{ marginBottom: 1 }}>
                LuxeHouse Management
            </Typography>
            <Typography
                variant='body2'
                color='textSecondary'
                sx={{ marginBottom: 2 }}
            >
                Login to access the admin dashboard
            </Typography>

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

                {loginMutation.isError && (
                    <Typography color='red' marginBottom={3}>
                        {loginMutation.error.response.data.message}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label='Email or Phone Number'
                        variant='outlined'
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label='Password'
                        type={showPassword ? 'text' : 'password'} // Toggle password visibility
                        variant='outlined'
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        edge='end'
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
