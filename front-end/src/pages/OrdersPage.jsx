import {
    AccessTime,
    AssignmentTurnedIn,
    Cancel,
    CheckCircle,
    LocalShipping,
} from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import useFetchOrders from '../hooks/useFetchOrders';

const statusIcons = {
    pending: <AccessTime color='warning' />,
    processing: <AssignmentTurnedIn color='info' />,
    shipped: <LocalShipping color='primary' />,
    delivered: <CheckCircle color='success' />,
    cancelled: <Cancel color='error' />,
};

const OrdersPage = () => {
    const [selectedTab, setSelectedTab] = useState('delivered');

    const { data: orders, isLoading } = useFetchOrders();

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const filteredOrders = orders?.filter(
        (order) => order.orderStatus === selectedTab
    );

    return (
        <Box
            sx={{
                mt: 8,
                p: 8,
                backgroundColor: '#f4f6f8',
                minHeight: '100vh',
            }}
        >
            <Container maxWidth='lg'>
                <Typography
                    variant='h4'
                    fontWeight='bold'
                    sx={{ textAlign: 'center' }}
                    gutterBottom
                >
                    Customer Orders
                </Typography>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor='primary'
                    indicatorColor='primary'
                    variant='fullWidth'
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 2,
                        mb: 3,
                        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    <Tab
                        value='pending'
                        label='Pending'
                        icon={statusIcons.pending}
                    />
                    <Tab
                        value='processing'
                        label='Processing'
                        icon={statusIcons.processing}
                    />
                    <Tab
                        value='shipped'
                        label='Shipped'
                        icon={statusIcons.shipped}
                    />
                    <Tab
                        value='delivered'
                        label='Delivered'
                        icon={statusIcons.delivered}
                    />
                    <Tab
                        value='cancelled'
                        label='Cancelled'
                        icon={statusIcons.cancelled}
                    />
                </Tabs>

                {filteredOrders?.length === 0 && (
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        No orders found
                    </Typography>
                )}
                {/* Display orders */}
                {isLoading && <Typography>Loading...</Typography>}
                <Grid container spacing={3}>
                    {filteredOrders?.map((order) => (
                        <Grid item xs={12} key={order.orderId}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant='h6'
                                                fontWeight='bold'
                                            >
                                                Order #{order.orderId}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                color='textSecondary'
                                            >
                                                Status:{' '}
                                                {order.orderStatus.toUpperCase()}
                                            </Typography>
                                        </Box>
                                        <Avatar
                                            sx={{ backgroundColor: '#f5f5f5' }}
                                        >
                                            {statusIcons[order.orderStatus]}
                                        </Avatar>
                                    </Box>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant='body1' gutterBottom>
                                        Shipping Address:{' '}
                                        {order.shipping_address}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        Shipping Date:{' '}
                                        {new Date(
                                            order.shipping_date
                                        ).toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        Delivery Date:{' '}
                                        {new Date(
                                            order.delivery_date
                                        ).toLocaleString()}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='textSecondary'
                                    >
                                        Notes: {order.notes}
                                    </Typography>
                                    <TableContainer sx={{ mt: 2 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow
                                                    sx={{
                                                        backgroundColor:
                                                            '#f9f9f9',
                                                    }}
                                                >
                                                    <TableCell>
                                                        Product
                                                    </TableCell>
                                                    <TableCell>Color</TableCell>
                                                    <TableCell>
                                                        Quantity
                                                    </TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order.orderDetails.map(
                                                    (item) => (
                                                        <TableRow
                                                            key={
                                                                item.orderDetailId
                                                            }
                                                        >
                                                            <TableCell>
                                                                {
                                                                    item.productName
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.colorType}
                                                            </TableCell>
                                                            <TableCell>
                                                                {item.quantity}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {item.price.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                $
                                                                {item.total.toFixed(
                                                                    2
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Box
                                        sx={{
                                            mt: 3,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                variant='body1'
                                                fontWeight='bold'
                                            >
                                                Subtotal: $
                                                {order.subtotal.toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                fontWeight='bold'
                                            >
                                                Shipping Cost: $
                                                {order.shipping_cost.toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant='h6'
                                                color='primary'
                                                fontWeight='bold'
                                            >
                                                Total: ${order.total.toFixed(2)}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            disabled={order.leaveFeedback}
                                        >
                                            {order.leaveFeedback
                                                ? 'Feedback Submitted'
                                                : 'Leave Feedback'}
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default OrdersPage;
