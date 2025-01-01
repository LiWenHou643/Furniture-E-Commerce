import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosPublic from '../api/axiosPublic';
import { useLogin } from '../hooks/useLogin';
import { isAuthenticated } from '../utils/auth';
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [persistent, setPersistent] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/'); // Redirect to homepage if already logged in
        }
    }, [navigate]);

    useEffect(() => {
        const refresh = async () => {
            try {
                await axiosPublic.get('/auth/refresh-token', {
                    withCredentials: true,
                });
            } catch (error) {
                console.error(error);
            }
        };

        refresh();
    }, [navigate]);

    const loginMutation = useLogin();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call the login mutation
        loginMutation.mutate({ username, password, persistent });
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
                                checked={persistent}
                                onChange={(e) =>
                                    setPersistent(e.target.checked)
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
