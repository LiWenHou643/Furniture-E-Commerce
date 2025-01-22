// src/components/Footer.js
import {
    Facebook,
    GitHub,
    Instagram,
    LinkedIn,
    Twitter,
    YouTube,
} from '@mui/icons-material';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components for customization
const FooterWrapper = styled(Box)(({ theme }) => ({
    color: '#666',
    padding: '50px 0',
    marginTop: 'auto',
    [theme.breakpoints.down('sm')]: {
        padding: '30px 0',
    },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginRight: '10px',
}));

const Footer = () => {
    return (
        <FooterWrapper>
            <Container>
                <Divider sx={{ marginY: 4 }} />
                <Grid container spacing={4} justifyContent='space-between'>
                    {/* Column 1: About Us */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant='h6' gutterBottom color='primary'>
                            LuxeHouse
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                            LuxeHouse is your one-stop shop for all your
                            furnitures needs. We offer the best products at
                            affordable prices.
                        </Typography>
                    </Grid>

                    {/* Column 2: Quick Links */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant='h6' gutterBottom color='primary'>
                            Quick Links
                        </Typography>
                        <Box>
                            <Link
                                href='#'
                                color='inherit'
                                display='block'
                                variant='body2'
                                sx={{ marginBottom: 1 }}
                            >
                                Home
                            </Link>
                            <Link
                                href='#'
                                color='inherit'
                                display='block'
                                variant='body2'
                                sx={{ marginBottom: 1 }}
                            >
                                Shop
                            </Link>
                            <Link
                                href='#'
                                color='inherit'
                                display='block'
                                variant='body2'
                                sx={{ marginBottom: 1 }}
                            >
                                Contact
                            </Link>
                            <Link
                                href='#'
                                color='inherit'
                                display='block'
                                variant='body2'
                            >
                                Privacy Policy
                            </Link>
                        </Box>
                    </Grid>

                    {/* Column 3: Contact Us */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant='h6' gutterBottom color='primary'>
                            Contact Us
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                            Email: luxehouse8386@gmail.com
                        </Typography>
                        <Typography variant='body2' color='textSecondary'>
                            Phone: +89 123 456 789
                        </Typography>
                    </Grid>
                </Grid>

                {/* Newsletter Subscription */}
                <Divider sx={{ marginY: 4 }} />
                <Box textAlign='center'>
                    <Typography variant='h6' gutterBottom color='primary'>
                        Subscribe to Our Newsletter
                    </Typography>
                    <Typography variant='body2' color='textSecondary' paragraph>
                        Stay updated with the latest news and offers from
                        LuxeHouse.
                    </Typography>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{ marginBottom: 3 }}
                    >
                        <TextField
                            label='Your Email'
                            variant='outlined'
                            sx={{ width: '300px', marginRight: 2 }}
                            size='small'
                            InputProps={{
                                style: {
                                    backgroundColor: '#fff',
                                    borderRadius: '5px',
                                },
                            }}
                        />
                        <Button variant='contained' color='primary'>
                            Subscribe
                        </Button>
                    </Box>
                </Box>

                {/* Social Media Links */}
                <Box textAlign='center' sx={{ marginBottom: 4 }}>
                    <Typography
                        variant='body2'
                        color='textSecondary'
                        gutterBottom
                    >
                        Follow Us
                    </Typography>
                    <Box>
                        <SocialIcon>
                            <Facebook />
                        </SocialIcon>
                        <SocialIcon>
                            <Instagram />
                        </SocialIcon>
                        <SocialIcon>
                            <Twitter />
                        </SocialIcon>
                        <SocialIcon>
                            <YouTube />
                        </SocialIcon>
                        <SocialIcon>
                            <LinkedIn />
                        </SocialIcon>
                        <SocialIcon>
                            <GitHub />
                        </SocialIcon>
                    </Box>
                </Box>

                {/* Copyright */}
                <Divider sx={{ marginY: 4 }} />
                <Typography
                    variant='body2'
                    color='textSecondary'
                    align='center'
                >
                    &copy; {new Date().getFullYear()} LuxeHouse. All Rights
                    Reserved.
                </Typography>
            </Container>
        </FooterWrapper>
    );
};

export default Footer;
