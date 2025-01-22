import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PaymentCancelledPage = () => {
    return (
        <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 20 }}>
            <Typography variant='h3' component='h1' gutterBottom>
                Payment Cancelled
            </Typography>
            <Typography variant='body1' paragraph>
                <Link component={RouterLink} to='/checkout' color='primary'>
                    Back To Checkout Page.
                </Link>
            </Typography>
            <Box sx={{ marginTop: 4 }}>
                <Typography variant='body2' color='textSecondary'>
                    Thank you for using our service.
                </Typography>
            </Box>
        </Container>
    );
};

export default PaymentCancelledPage;
