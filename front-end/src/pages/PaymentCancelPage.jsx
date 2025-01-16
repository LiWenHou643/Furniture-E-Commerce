import { Box, Container, Link, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import {
    Link as RouterLink,
    useParams,
    useSearchParams,
} from 'react-router-dom';

const PaymentCancelledPage = () => {
    const { id } = useParams(); // Extract the order ID from the URL
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token'); // Extract the token from the query string

        const fetchCancellationStatus = async () => {
            try {
                await axios.post(
                    `http://localhost:8080/orders/${id}/paypal/cancel`,
                    {
                        token,
                    }
                );
            } catch (error) {
                console.error('Error fetching cancellation status:', error);
            }
        };

        fetchCancellationStatus();
    }, [id, searchParams]);

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
