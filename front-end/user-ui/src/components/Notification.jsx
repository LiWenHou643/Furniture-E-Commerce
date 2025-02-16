import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useFetchNotifications from '../hooks/useFetchNotifications';
import useMarkNotiAsRead from '../hooks/useMarkNotiAsRead';
import WebSocketService from '../services/WebSocketService';
import { userId } from '../utils/auth';
import CustomTooltip from './CustomTooltip';

const Notification = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadNotis, setUnreadNotis] = useState([]);
    const open = Boolean(anchorEl);
    const currentUserId = userId();

    const { data: notificationsData, isLoading } = useFetchNotifications();
    const { mutate: markNotiAsRead } = useMarkNotiAsRead();

    // Websocket setup
    useEffect(() => {
        // Subscribe to incoming notifications
        WebSocketService.subscribeToMessages((notification) => {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                notification,
            ]);
        });

        // Register callback to update connection status
        WebSocketService.setConnectionChangeCallback((status) => {
            setIsConnected(status); // This will update the UI when connection status changes
        });

        // Connect to WebSocket
        WebSocketService.connect(currentUserId);

        // Cleanup on unmount
        return () => {
            WebSocketService.disconnect();
        };
    }, [currentUserId]);

    // Update notifications when data changes
    useEffect(() => {
        if (notificationsData) {
            setNotifications(notificationsData.content);
            const unreadNotis = notificationsData.content.filter(
                (notification) => !notification.readStatus
            );
            setUnreadCount(unreadNotis.length);
            setUnreadNotis(unreadNotis);
        }
    }, [notificationsData]);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setUnreadCount(0);
        const notificationIds = unreadNotis.map(
            (notification) => notification.notificationId
        );
        markNotiAsRead(notificationIds);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <CustomTooltip title='Open Notifications'>
                <IconButton
                    sx={{ color: 'white', paddingBottom: 0 }}
                    onClick={handleOpen}
                >
                    <Badge badgeContent={unreadCount} color='success'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </CustomTooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: 400,
                        width: '400px',
                    },
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {notifications.map((notification) => (
                    <MenuItem
                        key={notification.notificationId}
                        onClick={handleClose}
                        sx={{
                            padding: 1,
                            display: 'flex',
                            alignItems: 'start',
                            maxWidth: '400px',
                        }} // Ensure the max width matches Menu
                    >
                        <Box
                            marginLeft={1}
                            marginTop={0}
                            sx={{
                                maxWidth: 'calc(100% - 60px)', // Account for avatar width + margin
                                overflow: 'hidden',
                            }}
                        >
                            <Typography
                                variant='subtitle1'
                                fontWeight='bold'
                                noWrap
                            >
                                {notification.title}
                            </Typography>
                            <Typography
                                variant='body2'
                                color='text.secondary'
                                sx={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2, // Limits the text to 2 lines
                                    WebkitBoxOrient: 'vertical', // Ensures the text behaves like a block in a flex container
                                    overflow: 'hidden', // Hides the overflow text
                                    textOverflow: 'ellipsis', // Shows ellipsis when text is clipped
                                    whiteSpace: 'normal', // Ensures wrapping behavior
                                }}
                            >
                                {notification.detail}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
                <Divider />
                <Box display='flex' justifyContent='center' padding={1}>
                    <Button variant='text' size='small' onClick={handleClose}>
                        Show All
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Notification;
