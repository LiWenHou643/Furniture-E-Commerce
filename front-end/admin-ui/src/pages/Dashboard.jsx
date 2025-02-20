import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardContent,
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
import { DataGrid } from '@mui/x-data-grid';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import Notification from '../components/Notification';
import {
    useFetchMonthly,
    useFetchOrderCountByDayAndStatus,
    useFetchOrderCountByMonth,
    useFetchOrderCountByMonthAndStatus,
    useFetchOrderCountByYear,
} from '../hooks/useFetchOrdersCount';

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
    const { data: date_status, isLoading: isLoadingDate } =
        useFetchOrderCountByDayAndStatus();
    const { data: month, isLoading: isLoadingMonth } =
        useFetchOrderCountByMonth();
    const { data: month_status, isLoading: isLoadingMonthStatus } =
        useFetchOrderCountByMonthAndStatus();
    const { data: year, isLoading: isLoadingYear } = useFetchOrderCountByYear();
    const { data: monthly, isLoading: isLoadingMonthly } = useFetchMonthly();

    if (
        isLoadingDate ||
        isLoadingMonth ||
        isLoadingMonthStatus ||
        isLoadingYear ||
        isLoadingMonthly
    ) {
        return <div>Loading...</div>;
    }

    console.log({ date_status, month, month_status, year, monthly });

    // Convert numeric month to readable format
    const monthLabels = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    // Color mapping for charts
    const COLORS = ['#ff6961', '#77dd77', '#fd1d93', '#84b6f4', '#f16ae1'];

    const formattedMonthlyData = Array.from({ length: 12 }, (_, index) => {
        const found = monthly.find((m) => m.month === index + 1);
        return { month: monthLabels[index], count: found ? found.count : 0 };
    });
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

                {/* Order Status Overview (Pie Chart) */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                Order Status Breakdown
                            </Typography>
                            <ResponsiveContainer width='100%' height={300}>
                                <PieChart>
                                    <Pie
                                        data={date_status}
                                        dataKey='count'
                                        nameKey='status'
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={80}
                                        label
                                    >
                                        {date_status.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Monthly Order Trend (Bar Chart) */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>Monthly Orders</Typography>
                            <ResponsiveContainer width='100%' height={300}>
                                <BarChart data={formattedMonthlyData}>
                                    <XAxis dataKey='month' />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey='count' fill='#82ca9d' />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Order Status Data Table */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>
                                Order Status Details
                            </Typography>
                            <DataGrid
                                rows={date_status.map((item, index) => ({
                                    id: index,
                                    ...item,
                                }))}
                                columns={[
                                    {
                                        field: 'status',
                                        headerName: 'Status',
                                        flex: 1,
                                    },
                                    {
                                        field: 'count',
                                        headerName: 'Order Count',
                                        flex: 1,
                                    },
                                ]}
                                autoHeight
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Box>
        </Box>
    );
}
