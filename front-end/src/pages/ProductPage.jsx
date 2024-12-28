// src/components/ProductPage.js
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { id } = useParams(); // Get the dynamic 'id' from the URL

    return (
        <Container>
            <Typography variant='h4'>Product Details for {id}</Typography>
            <Typography variant='body1'>
                This is the detailed page for product {id}.
            </Typography>
        </Container>
    );
};

export default ProductPage;
