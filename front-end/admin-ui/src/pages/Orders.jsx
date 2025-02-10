import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

const initialOrders = [
    {
        orderId: 1,
        customerName: 'John Doe',
        status: 'Pending',
        date: '2025-01-01',
        total: 100.0,
    },
    {
        orderId: 2,
        customerName: 'Jane Smith',
        status: 'Shipped',
        date: '2025-01-02',
        total: 200.0,
    },
    {
        orderId: 3,
        customerName: 'Alice Johnson',
        status: 'Delivered',
        date: '2025-01-03',
        total: 150.0,
    },
];

export default function Orders() {
    const [orders, setOrders] = useState(initialOrders);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleSearch = (e) => setSearch(e.target.value);

    const handleFilterChange = (e) => setFilterStatus(e.target.value);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setOpenModal(false);
    };

    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.customerName.toLowerCase().includes(search.toLowerCase()) ||
            String(order.orderId).includes(search);
        const matchesStatus = filterStatus
            ? order.status === filterStatus
            : true;
        return matchesSearch && matchesStatus;
    });

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Order Management
            </Typography>

            {/* Filters and Search */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    label='Search by Order ID or Customer Name'
                    variant='outlined'
                    size='small'
                    value={search}
                    onChange={handleSearch}
                />
                <Select
                    value={filterStatus}
                    onChange={handleFilterChange}
                    displayEmpty
                    size='small'
                    sx={{ width: 200 }}
                >
                    <MenuItem value=''>All Statuses</MenuItem>
                    <MenuItem value='Pending'>Pending</MenuItem>
                    <MenuItem value='Shipped'>Shipped</MenuItem>
                    <MenuItem value='Delivered'>Delivered</MenuItem>
                </Select>
            </Box>

            {/* Orders Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.orderId}>
                                <TableCell>{order.orderId}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>
                                    <Select
                                        value={order.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order.orderId,
                                                e.target.value
                                            )
                                        }
                                        size='small'
                                    >
                                        <MenuItem value='Pending'>
                                            Pending
                                        </MenuItem>
                                        <MenuItem value='Shipped'>
                                            Shipped
                                        </MenuItem>
                                        <MenuItem value='Delivered'>
                                            Delivered
                                        </MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button
                                        size='small'
                                        startIcon={<VisibilityIcon />}
                                        onClick={() => handleOpenModal(order)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Order Details Modal */}
            {selectedOrder && (
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            p: 4,
                            borderRadius: 2,
                            boxShadow: 24,
                        }}
                    >
                        <Typography variant='h6' gutterBottom>
                            Order Details
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Order ID:</strong> {selectedOrder.orderId}
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Customer Name:</strong>{' '}
                            {selectedOrder.customerName}
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Status:</strong> {selectedOrder.status}
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Date:</strong> {selectedOrder.date}
                        </Typography>
                        <Typography variant='body1'>
                            <strong>Total:</strong> $
                            {selectedOrder.total.toFixed(2)}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 2,
                            }}
                        >
                            <Button onClick={handleCloseModal}>Close</Button>
                        </Box>
                    </Box>
                </Modal>
            )}
        </Box>
    );
}
