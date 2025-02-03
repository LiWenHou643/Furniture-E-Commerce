import { Person as PersonIcon } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import WebSocketService from '../services/WebSocketService';
const users = [
    { userId: 2, firstName: 'Bob', lastName: 'Smith' },
    { userId: 3, firstName: 'Alice', lastName: 'Johnson' },
];
const chatMessages = [
    {
        chatMessageId: 2,
        chatId: '1_2',
        senderId: 1,
        recipientId: 2,
        content: 'heehhe',
        timestamp: '2025-02-03T20:06:15',
    },
    {
        chatMessageId: 3,
        chatId: '1_2',
        senderId: 1,
        recipientId: 2,
        content: 'goglle',
        timestamp: '2025-02-03T20:07:15',
    },
    {
        chatMessageId: 4,
        chatId: '1_2',
        senderId: 2,
        recipientId: 1,
        content: 'fuckk',
        timestamp: '2025-02-03T20:06:30',
    },
    {
        chatMessageId: 5,
        chatId: '1_2',
        senderId: 2,
        recipientId: 1,
        content: 'nannn',
        timestamp: '2025-02-03T20:07:30',
    },
];

const ChatPage = () => {
    const [userId, setUserId] = useState(1);
    const [messages, setMessages] = useState(chatMessages);
    const [input, setInput] = useState('');
    const [recipient, setRecipient] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const isSender = (senderId) => senderId === userId;

    useEffect(() => {
        // Subscribe to incoming messages
        WebSocketService.subscribeToMessages((chatMessage) => {
            setMessages((prevMessages) => [...prevMessages, chatMessage]);
        });

        // Register callback to update connection status
        WebSocketService.setConnectionChangeCallback((status) => {
            setIsConnected(status); // This will update the UI when connection status changes
        });

        // Connect to WebSocket
        WebSocketService.connect(userId);

        // Cleanup on unmount
        return () => {
            WebSocketService.disconnect();
        };
    }, [userId]);

    const handleSendMessage = () => {
        const raw = {
            senderId: userId,
            recipientId: recipient.userId,
            content: input,
        };
        console.log('Sending:', raw);
        WebSocketService.sendMessage('/app/send', raw);
    };

    const handleRecipientChange = (recipient) => {
        console.log('Recipient user changed:', recipient);
        setRecipient(recipient);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Sidebar: List of users */}
            <SidebarBox>
                {/* Header */}
                <HeaderTypography variant='h6'>Users</HeaderTypography>

                {/* User List */}
                <List>
                    {users.map((user) => (
                        <UserListItem
                            button
                            key={user.userId}
                            onClick={() => handleRecipientChange(user)}
                        >
                            {/* User Avatar */}
                            <Avatar sx={{ marginRight: 2, bgcolor: '#3498db' }}>
                                <PersonIcon />
                            </Avatar>
                            {/* User Name */}
                            <ListItemText
                                primary={`${user.firstName} ${user.lastName}`}
                                sx={{ color: '#ecf0f1' }}
                            />
                        </UserListItem>
                    ))}
                </List>

                <Divider sx={{ backgroundColor: '#7f8c8d' }} />
            </SidebarBox>

            {/* Chat Area: Display messages and opponent's username */}
            <Box sx={{ flex: 1, backgroundColor: '#fff' }}>
                {Object.keys(recipient).length === 0 ? (
                    <Typography variant='h6'>
                        Select a user to start chatting
                    </Typography>
                ) : (
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant='h6'>
                            {recipient.firstName + ' ' + recipient.lastName}
                        </Typography>
                    </Box>
                )}

                {/* Chat Messages */}
                <Box>
                    {Object.keys(recipient).length !== 0 &&
                        messages.map((message) => (
                            <Box
                                key={message.chatMessageId}
                                sx={{
                                    display: 'flex',
                                    flexDirection: isSender(message.senderId)
                                        ? 'row-reverse'
                                        : 'row',
                                }}
                            >
                                <Paper
                                    sx={{
                                        padding: 2,
                                        backgroundColor: isSender(
                                            message.senderId
                                        )
                                            ? '#0078D4'
                                            : '#e0e0e0',
                                        color: isSender(message.senderId)
                                            ? '#fff'
                                            : '#000',
                                        borderRadius: '16px',
                                        maxWidth: '70%',
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    <Typography variant='body1'>
                                        {message.content}
                                    </Typography>
                                    {message.timestamp && (
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                textAlign: isSender(
                                                    message.senderId
                                                )
                                                    ? 'right'
                                                    : 'left',
                                            }}
                                        >
                                            {new Date(
                                                message.timestamp
                                            ).toLocaleTimeString()}
                                        </Typography>
                                    )}
                                </Paper>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Box>
    );
};

// Styled Box for the sidebar
const SidebarBox = styled(Box)(({ theme }) => ({
    width: '280px',
    backgroundColor: '#2c3e50', // Darker background for the sidebar
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    height: '100vh',
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
    color: '#ecf0f1',
    marginBottom: '20px',
    fontWeight: 500,
    fontSize: '20px',
}));

const UserListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '10px',
    '&:hover': {
        backgroundColor: '#34495e', // Hover effect with a slightly lighter dark background
    },
}));

export default ChatPage;
