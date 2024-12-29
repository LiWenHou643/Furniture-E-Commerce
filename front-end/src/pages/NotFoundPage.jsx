import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // for navigation (optional)

const NotFoundPage = () => {
    return (
        <Container
            maxWidth='sm'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant='h1'
                    component='h1'
                    color='error'
                    gutterBottom
                >
                    404
                </Typography>
                <Typography variant='h4' component='p' gutterBottom>
                    Oops! The page you&apos;re looking for doesn&apos;t exist.
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    component={Link}
                    to='/' // Adjust this path to wherever you want the user to go back to
                >
                    Go Back Home
                </Button>
            </Box>
        </Container>
    );
};

export default NotFoundPage;
