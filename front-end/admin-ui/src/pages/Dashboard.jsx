import {
    AppBar,
    Avatar,
    Box,
    Container,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import Notification from '../components/Notification';
import {
    useFetchMonthly,
    useFetchSummary,
    useFetchThisMonth,
    useFetchToday,
} from '../hooks/useFetchOrderAndRevenue';

// Sample Sales Data
const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 7000 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 8000 },
];

// Sample Orders Data
const orders = [
    { id: 1, customer: 'Alice Johnson', date: '2025-02-15', amount: '$120.00' },
    { id: 2, customer: 'John Doe', date: '2025-02-16', amount: '$95.00' },
    { id: 3, customer: 'Emma Smith', date: '2025-02-17', amount: '$250.00' },
];

// Sample Top Products Data
const topProducts = [
    {
        id: 1,
        name: 'Wireless Earbuds',
        image: 'https://via.placeholder.com/50',
        sales: '1,200',
    },
    {
        id: 2,
        name: 'Smart Watch',
        image: 'https://via.placeholder.com/50',
        sales: '980',
    },
    {
        id: 3,
        name: 'Gaming Mouse',
        image: 'https://via.placeholder.com/50',
        sales: '870',
    },
];

export default function Dashboard() {
    const { data: summary, isLoading: isLoadingSummary } = useFetchSummary();
    const { data: today, isLoading: isLoadingToday } = useFetchToday();
    const { data: thisMonth, isLoading: isLoadingThisMonth } =
        useFetchThisMonth();
    const { data: monthly, isLoading: isLoadingMonthly } = useFetchMonthly();

    if (
        isLoadingSummary ||
        isLoadingToday ||
        isLoadingThisMonth ||
        isLoadingMonthly
    ) {
        return <div>Loading...</div>;
    }

    console.log({ summary, today, thisMonth, monthly });

    return (
        <Box sx={{ display: 'flex' }}>
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
                            <Notification />
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
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    📈 Sales Analytics
                                </Typography>
                                <ResponsiveContainer width='100%' height={300}>
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='month' />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type='monotone'
                                            dataKey='sales'
                                            stroke='#1976d2'
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>

                        {/* Recent Orders */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    🛒 Recent Orders
                                </Typography>
                                <TableContainer>
                                    <Table size='small'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <b>Customer</b>
                                                </TableCell>
                                                <TableCell>
                                                    <b>Date</b>
                                                </TableCell>
                                                <TableCell>
                                                    <b>Amount</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orders.map((order) => (
                                                <TableRow key={order.id}>
                                                    <TableCell>
                                                        {order.customer}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.date}
                                                    </TableCell>
                                                    <TableCell>
                                                        {order.amount}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Grid>

                        {/* Top Products */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    🔥 Top Selling Products
                                </Typography>
                                <Grid container spacing={2}>
                                    {topProducts.map((product) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            key={product.id}
                                        >
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    borderRadius: 2,
                                                }}
                                            >
                                                <Avatar
                                                    variant='square'
                                                    src={product.image}
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                />
                                                <div>
                                                    <Typography variant='subtitle1'>
                                                        <b>{product.name}</b>
                                                    </Typography>
                                                    <Typography
                                                        variant='body2'
                                                        color='text.secondary'
                                                    >
                                                        Sold: {product.sales}
                                                    </Typography>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
