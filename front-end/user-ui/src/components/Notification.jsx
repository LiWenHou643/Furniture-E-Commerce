import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import CustomTooltip from './CustomTooltip';

const Notification = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const notifications = [
        {
            id: 1,
            image: 'https://via.placeholder.com/50',
            title: 'New Comment commented on your post commented on your post',
            detail: 'John commented on your post. John commented on your post. John commented on your post.',
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/50',
            title: 'New Follower',
            detail: 'Alice started following you. John commented on your post. John commented on your post.',
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/50',
            title: 'Update Available',
            detail: 'A new update is available for your app. John commented on your post. John commented on your pos',
        },
    ];

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Badge
                        badgeContent={notifications.length}
                        color='secondary'
                    >
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
                        key={notification.id}
                        onClick={handleClose}
                        sx={{
                            padding: 1,
                            display: 'flex',
                            alignItems: 'start',
                            maxWidth: '400px',
                        }} // Ensure the max width matches Menu
                    >
                        <Avatar
                            src={notification.image}
                            sx={{
                                borderRadius: 0,
                                width: 'auto',
                                height: 'auto',
                                mt: 0.7,
                                flexShrink: 0,
                            }} // Prevent resizing
                        />
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
