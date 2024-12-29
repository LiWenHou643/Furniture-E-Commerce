// src/components/Home.js
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
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const Home = () => {
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

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
                        sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
                    >
                        Welcome to MyShop
                    </Typography>
                    <Typography variant='h6' sx={{ color: 'white', mb: 3 }}>
                        Shop the best products at unbeatable prices.
                    </Typography>
                    <Button
                        variant='contained'
                        color='primary'
                        component={Link}
                        to='/shop'
                        size='large'
                    >
                        Shop Now
                    </Button>
                </Container>
            </Box>

            {/* Featured Products Carousel */}
            <Container sx={{ my: 5 }}>
                <Typography variant='h4' sx={{ mb: 3, fontWeight: 'bold' }}>
                    Featured Products
                </Typography>
                <Slider {...carouselSettings}>
                    <div>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component='img'
                                alt='Product Image'
                                height='200'
                                image='https://picsum.photos/200'
                            />
                            <CardContent>
                                <Typography variant='h6'>
                                    Product Name
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    $19.99
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component='img'
                                alt='Product Image'
                                height='200'
                                image='https://picsum.photos/200'
                            />
                            <CardContent>
                                <Typography variant='h6'>
                                    Product Name
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    $29.99
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component='img'
                                alt='Product Image'
                                height='200'
                                image='https://picsum.photos/200'
                            />
                            <CardContent>
                                <Typography variant='h6'>
                                    Product Name
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    $49.99
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </Slider>
            </Container>

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
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f4f4f4',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Electronics
                            </Typography>
                            <Button
                                variant='outlined'
                                component={Link}
                                to='/shop/electronics'
                            >
                                Explore
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f4f4f4',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Clothing
                            </Typography>
                            <Button
                                variant='outlined'
                                component={Link}
                                to='/shop/clothing'
                            >
                                Explore
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                backgroundColor: '#f4f4f4',
                            }}
                        >
                            <Typography
                                variant='h6'
                                sx={{ fontWeight: 'bold' }}
                            >
                                Home & Kitchen
                            </Typography>
                            <Button
                                variant='outlined'
                                component={Link}
                                to='/shop/home'
                            >
                                Explore
                            </Button>
                        </Box>
                    </Grid>
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
                                123 Furniture St, Home City, HC 12345
                            </Typography>
                            <Typography variant='body1'>
                                Email: support@furniturestore.com
                            </Typography>
                            <Typography variant='body1'>
                                Phone: (123) 456-7890
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default Home;
