import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetchCart from '../hooks/useFetchCart';
import useFetchUserProfile from '../hooks/useFetchUserProfile';
import useLogout from '../hooks/useLogout';
import { isAuthenticated } from '../utils/auth';
import CustomTooltip from './CustomTooltip';
import Notification from './Notification';

const pages = ['Products', 'News', 'Orders'];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const logout = useLogout();
    const { data: cart, isLoading } = useFetchCart();
    const { data: profile } = useFetchUserProfile();

    const cartCount = isAuthenticated() && cart ? cart.cartItems.length : 0;

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);

        console.log('Selected page:', page);

        // Navigate to the selected page
        navigate(`/${page?.toLowerCase()}`);
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);

        if (!setting) return; // Ignore null values

        // Handle logout
        if (setting === 'Logout') {
            logout.handleLogout();
            return;
        }

        // Navigate to the selected page
        navigate(`/${setting.toLowerCase()}`);
    };

    console.log(profile);

    return (
        <AppBar position='fixed'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <HomeIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
                    <Typography
                        variant='h6'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LuxeHouse
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleCloseNavMenu(page)} // Pass the selected page
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* Buttons (Login/Register or Logout) */}
                    <Box>
                        {!isAuthenticated() && (
                            <>
                                <Button
                                    variant='outlined'
                                    color='inherit'
                                    component={Link}
                                    to='/login'
                                    sx={{
                                        mr: 1,
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='inherit'
                                    component={Link}
                                    to='/register'
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* Responsive Navigation */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)} // Pass the selected page
                                >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Logo */}
                    <HomeIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
                    <Typography
                        variant='h5'
                        noWrap
                        component={Link}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LuxeHouse
                    </Typography>

                    {/* Notification and User Menu */}
                    {isAuthenticated() && (
                        <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
                            <Notification />

                            {/* Cart Icon with Badge */}
                            <IconButton
                                color='inherit'
                                onClick={() => navigate('/cart')}
                            >
                                <Badge
                                    badgeContent={isLoading ? 0 : cartCount}
                                    color='success'
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            <CustomTooltip title='Open settings'>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={
                                            profile?.lastName +
                                            ' ' +
                                            profile?.firstName
                                        }
                                        src={profile?.avatar}
                                    />
                                </IconButton>
                            </CustomTooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={() => handleCloseUserMenu(null)}
                            >
                                {settings.map((setting) => (
                                    <MenuItem
                                        key={setting}
                                        onClick={() =>
                                            handleCloseUserMenu(setting)
                                        } // Pass the selected setting
                                    >
                                        <Typography
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
