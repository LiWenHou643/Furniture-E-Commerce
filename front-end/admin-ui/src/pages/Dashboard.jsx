import {
    AppBar,
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Stack,
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

import Loading from '../components/Loading';
import useFetchMonthlyIncome from '../hooks/useFetchMonthlyIncome';
import {
    useFetchMonthly,
    useFetchOrderCountByDayAndStatus,
    useFetchOrderCountByMonth,
    useFetchOrderCountByMonthAndStatus,
    useFetchOrderCountByYear,
} from '../hooks/useFetchOrdersCount';
import useFetchTopSales from '../hooks/useFetchTopSales';
import useFetchTotalIncome from '../hooks/useFetchTotalIncome';
import useFetchTotalOrderCount from '../hooks/useFetchTotalOrderCount';
import useFetchTotalSales from '../hooks/useFetchTotalSales';
import useFetchUserCount from '../hooks/useFetchUserCount';

export default function Dashboard() {
    const { data: date_status, isLoading: isLoadingDate } =
        useFetchOrderCountByDayAndStatus();
    const { data: month, isLoading: isLoadingMonth } =
        useFetchOrderCountByMonth();
    const { data: month_status, isLoading: isLoadingMonthStatus } =
        useFetchOrderCountByMonthAndStatus();
    const { data: year, isLoading: isLoadingYear } = useFetchOrderCountByYear();
    const { data: monthly, isLoading: isLoadingMonthly } = useFetchMonthly();
    const { data: topProductsData, isLoading: isLoadingTopProducts } =
        useFetchTopSales();
    const { data: userCount, isLoading: isLoadingUserCount } =
        useFetchUserCount();
    const { data: totalOrderCount, isLoading: isLoadingTotalOrderCount } =
        useFetchTotalOrderCount();
    const { data: totalSales, isLoading: isLoadingTotalSales } =
        useFetchTotalSales();
    const { data: totalIncome, isLoading: isLoadingTotalIncome } =
        useFetchTotalIncome();
    const { data: monthlyIncome, isLoading: isLoadingMonthlyIncome } =
        useFetchMonthlyIncome();

    if (
        isLoadingDate ||
        isLoadingMonth ||
        isLoadingMonthStatus ||
        isLoadingYear ||
        isLoadingMonthly ||
        isLoadingTopProducts ||
        isLoadingUserCount ||
        isLoadingTotalOrderCount ||
        isLoadingTotalSales ||
        isLoadingTotalIncome ||
        isLoadingMonthlyIncome
    ) {
        return <Loading />;
    }

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
    const COLORS = ['#cc6d00', '#ced100', '#0049d1', '#008c13', '#a60000'];

    const formattedMonthlyData = Array.from({ length: 12 }, (_, index) => {
        const found = monthly.find((m) => m.month === index + 1);
        return { month: monthLabels[index], count: found ? found.count : 0 };
    });

    const emptyDateStatus =
        date_status.filter((item) => item.count !== 0).length === 0;

    const emptyMonthStatus =
        month_status.filter((item) => item.count !== 0).length === 0;

    // Prepare data for the chart (ensuring every month is present)
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1); // Array [1, 2, ..., 12]

    const salesData = allMonths.map((month) => {
        const dataForMonth = monthlyIncome.find((data) => data.month === month);
        return {
            month,
            sales: dataForMonth ? dataForMonth.value : 0,
        };
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
                                    Sold Products
                                </Typography>
                                <Typography variant='h4'>
                                    {totalSales}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>Orders</Typography>
                                <Typography variant='h4'>
                                    {totalOrderCount}
                                    {console.log(totalOrderCount)}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>Customers</Typography>
                                <Typography variant='h4'>
                                    {userCount}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant='h6'>Revenue</Typography>
                                <Typography variant='h4'>
                                    ${totalIncome}
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Sales Analytics */}
                        <Grid item xs={12} md={7}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    📈 Sales Analytics
                                </Typography>
                                <ResponsiveContainer width='100%' height={300}>
                                    <LineChart data={salesData}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='month' />
                                        <YAxis
                                            tickFormatter={(value) =>
                                                `$${value}`
                                            }
                                        />
                                        <Tooltip
                                            formatter={(value) => `$${value}`}
                                        />
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

                        {/* Top Products */}
                        <Grid item xs={12} md={5}>
                            <Paper sx={{ p: 3, borderRadius: 2 }}>
                                <Typography variant='h6' gutterBottom>
                                    🔥 Top Selling Products
                                </Typography>
                                <Grid container spacing={2}>
                                    {topProductsData.map((product) => (
                                        <Grid
                                            item
                                            xs={12}
                                            key={product.productId}
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
                                                <div>
                                                    <Typography variant='subtitle1'>
                                                        <b>
                                                            {
                                                                product.productName
                                                            }
                                                        </b>
                                                    </Typography>
                                                    <Typography
                                                        variant='body2'
                                                        color='text.secondary'
                                                    >
                                                        Sold:{' '}
                                                        {product.soldQuantity}
                                                    </Typography>
                                                </div>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Order Status Overview (Pie Chart) */}
                    <Grid
                        container
                        spacing={2} // Optional: Adds spacing between columns
                        sx={{ my: 2 }}
                    >
                        <Grid item xs={4} sx={{ p: 3 }}>
                            {!emptyDateStatus ? (
                                <Card>
                                    <CardContent>
                                        <Typography variant='h6'>
                                            Order Today
                                        </Typography>
                                        <ResponsiveContainer height={300}>
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
                                                    {date_status.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORS[
                                                                        index %
                                                                            COLORS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Typography
                                    variant='h6'
                                    sx={{
                                        my: 2,
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    No data order today available
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>
                                        Order Status Details
                                    </Typography>
                                    <DataGrid
                                        rows={date_status.map(
                                            (item, index) => ({
                                                id: index,
                                                ...item,
                                            })
                                        )}
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
                                        pageSizeOptions={[1000]} // Set a very high value to show all rows
                                        hideFooterPagination // Hide pagination controls
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Order Status Overview (Pie Chart) */}
                    <Grid
                        container
                        spacing={2} // Optional: Adds spacing between columns
                        sx={{ my: 2 }}
                    >
                        <Grid item xs={4} sx={{ p: 3 }}>
                            {!emptyMonthStatus ? (
                                <Card>
                                    <CardContent>
                                        <Typography variant='h6'>
                                            Order In This Month
                                        </Typography>
                                        <ResponsiveContainer height={300}>
                                            <PieChart>
                                                <Pie
                                                    data={month_status}
                                                    dataKey='count'
                                                    nameKey='status'
                                                    cx='50%'
                                                    cy='50%'
                                                    outerRadius={80}
                                                    label
                                                >
                                                    {month_status.map(
                                                        (entry, index) => (
                                                            <Cell
                                                                key={`cell-${index}`}
                                                                fill={
                                                                    COLORS[
                                                                        index %
                                                                            COLORS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <Stack
                                            direction='row'
                                            spacing={2}
                                            flexWrap='wrap'
                                            justifyContent='center'
                                        >
                                            {month_status.map(
                                                (entry, index) => (
                                                    <Stack
                                                        key={index}
                                                        direction='row'
                                                        alignItems='center'
                                                        spacing={1}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 12,
                                                                height: 12,
                                                                backgroundColor:
                                                                    COLORS[
                                                                        index %
                                                                            COLORS.length
                                                                    ],
                                                                borderRadius:
                                                                    '50%',
                                                            }}
                                                        />
                                                        <Typography variant='body2'>
                                                            {entry.status}
                                                        </Typography>
                                                    </Stack>
                                                )
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ) : (
                                <Typography
                                    variant='h6'
                                    sx={{
                                        my: 2,
                                        textAlign: 'center',
                                        width: '100%',
                                    }}
                                >
                                    No data order this month available
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h6'>
                                        Order Status Details
                                    </Typography>
                                    <DataGrid
                                        rows={month_status.map(
                                            (item, index) => ({
                                                id: index,
                                                ...item,
                                            })
                                        )}
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
                                        pageSizeOptions={[1000]} // Set a very high value to show all rows
                                        hideFooterPagination // Hide pagination controls
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Monthly Order Trend (Bar Chart) */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant='h6'>
                                    Monthly Finished Orders In{' '}
                                    {new Date().getFullYear()}
                                </Typography>
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
                </Container>
            </Box>
        </Box>
    );
}
