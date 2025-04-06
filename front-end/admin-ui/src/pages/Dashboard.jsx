import {
    AppBar,
    Box,
    Card,
    CardContent,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
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
    useFetchOrderCountByMonthAndStatus,
} from '../hooks/useFetchOrdersCount';
import useFetchTopSales from '../hooks/useFetchTopSales';
import useFetchTotalIncome from '../hooks/useFetchTotalIncome';
import useFetchTotalOrderCount from '../hooks/useFetchTotalOrderCount';
import useFetchTotalSales from '../hooks/useFetchTotalSales';
import useFetchUserCount from '../hooks/useFetchUserCount';

export default function Dashboard() {
    // State for selected year and month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().getMonth() + 1
    );
    const [selectedDay, setSelectedDay] = useState(new Date().getDate());
    const [daysInMonth, setDaysInMonth] = useState(31);

    // State for selected year and month
    const [selectedYear2, setSelectedYear2] = useState(
        new Date().getFullYear()
    );
    const [selectedMonth2, setSelectedMonth2] = useState(
        new Date().getMonth() + 1
    );

    // State for selected year
    const [selectedYear3, setSelectedYear3] = useState(
        new Date().getFullYear()
    );

    const { data: date_status, isLoading: isLoadingDate } =
        useFetchOrderCountByDayAndStatus({
            year: selectedYear,
            month: selectedMonth,
            day: selectedDay,
        });
    const { data: month_status, isLoading: isLoadingMonthStatus } =
        useFetchOrderCountByMonthAndStatus({
            year: selectedYear2,
            month: selectedMonth2,
        });
    const { data: monthly, isLoading: isLoadingMonthly } = useFetchMonthly({
        year: selectedYear3,
    });
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

    const currentYear = new Date().getFullYear(); // Get the current year

    // Function to calculate if a year is a leap year
    function isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    // Function to calculate the number of days in a month, considering leap years
    function getDaysInMonth(month, year) {
        // Handle months with fixed days
        if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30; // April, June, September, November
        }
        if (month === 2) {
            // February, check if it's a leap year
            return isLeapYear(year) ? 29 : 28;
        }
        return 31; // January, March, May, July, August, October, December
    }

    // Handler for changing the year
    const handleYearChange = (event) => {
        setSelectedYear(Number(event.target.value));
    };

    // Handle month change
    const handleMonthChange = (event) => {
        const month = event.target.value;
        setSelectedMonth(month);

        // Update the number of days for the selected month
        const days = getDaysInMonth(month, currentYear);
        setDaysInMonth(days);

        // If the selected day is greater than the number of days in the month, reset to the last day
        if (selectedDay > days) {
            setSelectedDay(days);
        }
    };

    // Handler for changing the month
    const handleDayChange = (event) => {
        setSelectedDay(Number(event.target.value));
    };

    // Update day options when month or year changes
    useEffect(() => {
        const days = getDaysInMonth(selectedMonth, selectedYear);
        setDaysInMonth(days);

        // If the current selected day is more than the number of days in the month, adjust it
        if (selectedDay > days) {
            setSelectedDay(days);
        }
    }, [selectedMonth, getDaysInMonth, selectedYear, selectedDay]);

    if (
        isLoadingDate ||
        isLoadingMonthStatus ||
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
        date_status?.filter((item) => item.count !== 0).length === 0;

    const emptyMonthStatus =
        month_status?.filter((item) => item.count !== 0).length === 0;

    // Prepare data for the chart (ensuring every month is present)
    const allMonths = Array.from({ length: 12 }, (_, index) => index + 1); // Array [1, 2, ..., 12]

    const salesData = allMonths.map((month) => {
        const dataForMonth = monthlyIncome.find((data) => data.month === month);
        return {
            month,
            sales: dataForMonth ? dataForMonth.value : 0,
        };
    });

    // Handler for changing the year
    const handleYearChange2 = (event) => {
        setSelectedYear2(Number(event.target.value));
    };

    // Handler for changing the month
    const handleMonthChange2 = (event) => {
        setSelectedMonth2(Number(event.target.value));
    };

    // Handler for changing the year
    const handleYearChange3 = (event) => {
        setSelectedYear3(Number(event.target.value));
    };

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
                                <Typography variant='h6'>
                                    Finished Orders
                                </Typography>
                                <Typography variant='h4'>
                                    {totalOrderCount}
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

                    <Divider sx={{ my: 4 }} />

                    {/* Year and Month Selection */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                    label='Year'
                                    variant='outlined'
                                >
                                    {Array.from(
                                        { length: 5 },
                                        (_, i) => new Date().getFullYear() - i
                                    ).map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    label='Month'
                                    variant='outlined'
                                >
                                    {Array.from(
                                        { length: 12 },
                                        (_, i) => i + 1
                                    ).map((month) => (
                                        <MenuItem key={month} value={month}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Day Selector */}
                        <Grid item xs={12} sm={4} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Day</InputLabel>
                                <Select
                                    value={selectedDay}
                                    onChange={handleDayChange}
                                    label='Day'
                                    variant='outlined'
                                >
                                    {Array.from(
                                        { length: daysInMonth },
                                        (_, i) => i + 1
                                    ).map((day) => (
                                        <MenuItem key={day} value={day}>
                                            {day}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                                    {date_status?.map(
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
                                            {date_status?.map(
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
                                        rows={date_status?.map(
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

                    <Divider sx={{ my: 4 }} />

                    {/* Year and Month Selection */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={selectedYear2}
                                    onChange={handleYearChange2}
                                    label='Year'
                                    variant='outlined'
                                >
                                    {Array.from(
                                        { length: 5 },
                                        (_, i) => new Date().getFullYear() - i
                                    ).map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={selectedMonth2}
                                    onChange={handleMonthChange2}
                                    label='Month'
                                    variant='outlined'
                                >
                                    {Array.from(
                                        { length: 12 },
                                        (_, i) => i + 1
                                    ).map((month) => (
                                        <MenuItem key={month} value={month}>
                                            {month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
                                                    {month_status?.map(
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

                    <Divider sx={{ my: 4 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth>
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={selectedYear3}
                                    onChange={handleYearChange3}
                                    label='Year'
                                    variant='outlined'
                                >
                                    {Array.from(
                                        { length: 5 },
                                        (_, i) => new Date().getFullYear() - i
                                    ).map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Monthly Order Trend (Bar Chart) */}
                    <Grid item xs={12} mt={5}>
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
