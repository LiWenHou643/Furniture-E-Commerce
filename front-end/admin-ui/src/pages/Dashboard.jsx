import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    AppBar,
    Badge,
    Box,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import { LineChart } from '../components/Charts';

export default function Dashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar */}

            {/* Main Content */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: '#f4f6f8',
                    minHeight: '100vh',
                }}
            >
                {/* Header */}
                <AppBar position='static' color='transparent' elevation={0}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant='h4' noWrap>
                            Admin Dashboard
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton>
                                <Badge badgeContent={4} color='primary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Dashboard Grid */}
                <Container>
                    <Grid container spacing={3}>
                        {/* Stats Cards */}
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>
                                    Total Sales
                                </Typography>
                                <Typography variant='h4'>$12,345</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>Orders</Typography>
                                <Typography variant='h4'>234</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>Customers</Typography>
                                <Typography variant='h4'>1,234</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>Revenue</Typography>
                                <Typography variant='h4'>$67,890</Typography>
                            </Paper>
                        </Grid>

                        {/* Sales Analytics */}
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    Sales Analytics
                                </Typography>
                                <LineChart />
                            </Paper>
                        </Grid>

                        {/* Recent Orders */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    Recent Orders
                                </Typography>
                                {/* Add Table Component */}
                            </Paper>
                        </Grid>

                        {/* Top Products */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    Top Products
                                </Typography>
                                {/* Add Product Grid */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
