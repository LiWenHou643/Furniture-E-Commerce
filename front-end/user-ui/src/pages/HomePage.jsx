import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    TextField,
    Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useFetchCategory from '../hooks/useFetchCategory';

const Home = () => {
    const navigate = useNavigate();

    const { data: categories, isLoading: loadingCategories } =
        useFetchCategory();

    if (loadingCategories) {
        return <Loading />;
    }

    return (
        <div>
            {/* Hero Section */}
            <Box
                sx={{
                    position: 'relative',
                    height: '100vh',
                    backgroundImage: 'url(/banner.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Container
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant='h3'
                        sx={{ color: 'black', fontWeight: 'bold', mb: 2 }}
                    >
                        Welcome to LuxeHouse
                    </Typography>
                    <Typography variant='h6' sx={{ color: 'black', mb: 3 }}>
                        Shop the best furnitures products at unbeatable prices.
                    </Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/products'
                        size='large'
                    >
                        Shop Now
                    </Button>
                </Container>
            </Box>

            {/* Promotions Section */}
            <Container sx={{ my: 5 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f8f8f8',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Flash Sale
                            </Typography>
                            <Typography variant='body1'>
                                Up to 50% off on selected products. Hurry,
                                limited time only!
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f8f8f8',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Free Shipping
                            </Typography>
                            <Typography variant='body1'>
                                Enjoy free shipping on orders over $50.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f8f8f8',
                            }}
                        >
                            <Typography
                                variant='h5'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Buy One Get One
                            </Typography>
                            <Typography variant='body1'>
                                Get a free item with every qualifying purchase.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Featured Categories */}
            <Container sx={{ my: 5 }}>
                <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
                    Shop by Categories
                </Typography>
                <Grid container spacing={4}>
                    {categories?.map((category) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={category.categoryId}
                        >
                            <Card
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    borderRadius: '0px',
                                }}
                                onClick={() =>
                                    navigate(
                                        `/products?categories=${category.categoryId}`
                                    )
                                }
                            >
                                <CardMedia
                                    component='img'
                                    height='250'
                                    image={category.imageUrl}
                                    alt='Category Image'
                                    style={{
                                        objectFit: 'fill',
                                        objectPosition: 'center',
                                    }}
                                />
                                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography variant='h6'>
                                        {category.categoryName}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {category.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* About Us Section */}
            <Box
                sx={{ paddingY: '50px', backgroundColor: '#f4f4f4' }}
                id='about'
            >
                <Container>
                    <Typography
                        variant='h4'
                        align='center'
                        sx={{ marginBottom: '30px' }}
                    >
                        About Us
                    </Typography>
                    <Typography
                        variant='body1'
                        align='center'
                        sx={{ maxWidth: '800px', margin: '0 auto' }}
                    >
                        We are a leading furniture store offering a wide variety
                        of furniture pieces for every room in your home. Our
                        mission is to provide high-quality furniture that
                        enhances the comfort and style of your living space.
                    </Typography>
                </Container>
            </Box>

            {/* Customer Testimonials Section */}
            <Container sx={{ paddingY: '50px' }} id='testimonials'>
                <Typography
                    variant='h4'
                    align='center'
                    sx={{ marginBottom: '30px' }}
                >
                    What Our Customers Say
                </Typography>
                <Grid container spacing={4} justifyContent='center'>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: '20px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography
                                variant='body1'
                                sx={{ marginBottom: '15px' }}
                            >
                                &quot;I bought a new sofa from this store, and
                                it&apos;s amazing! Super comfortable and
                                stylish.&quot;
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                - Jane Doe
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: '20px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                            }}
                        >
                            <Typography
                                variant='body1'
                                sx={{ marginBottom: '15px' }}
                            >
                                &quot;Great service and quick delivery. Highly
                                recommend this store for all your furniture
                                needs.&quot;
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                - John Smith
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Contact Us Section */}
            <Box
                sx={{ paddingY: '50px', backgroundColor: '#f4f4f4' }}
                id='contact'
            >
                <Container>
                    <Typography
                        variant='h4'
                        align='center'
                        sx={{ marginBottom: '30px' }}
                    >
                        Contact Us
                    </Typography>
                    <Grid container spacing={4} justifyContent='center'>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant='h6'>Get in Touch</Typography>
                            <TextField
                                label='Your Name'
                                fullWidth
                                margin='normal'
                            />
                            <TextField
                                label='Your Email'
                                fullWidth
                                margin='normal'
                            />
                            <TextField
                                label='Message'
                                multiline
                                rows={4}
                                fullWidth
                                margin='normal'
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ marginTop: '20px' }}
                            >
                                Send Message
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant='h6'>Store Location</Typography>
                            <Typography variant='body1'>
                                1 Mau Than, An Nghiep, Ninh Kieu, TP Can Tho
                            </Typography>
                            <Typography variant='body1'>
                                Email: luxehouse8386@gmail.com
                            </Typography>
                            <Typography variant='body1'>
                                Phone: +89 123 456 789
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Home;
