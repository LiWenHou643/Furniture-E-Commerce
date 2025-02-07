import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import Loading from '../components/Loading';
import useFetchAllChats from '../hooks/useFetchAllChats';
import useFetchChat from '../hooks/useFetchChat';
import WebSocketService from '../services/WebSocketService';

const ChatPage = () => {
    const theme = useTheme();
    const [userId, setUserId] = useState(1);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [recipient, setRecipient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const { data: chatRooms, isLoading } = useFetchAllChats();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useFetchChat(recipient);

    const isSender = (senderId) => senderId === userId;

    const chatContainerRef = useRef(null);

    // Connect to WebSocket on component mount
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

    // Set the recipient to the first user in the chat list
    useEffect(() => {
        if (chatRooms && chatRooms.length > 0) {
            setRecipient(chatRooms[0].userId);
        }
    }, [chatRooms]);

    useEffect(() => {
        if (chatContainerRef.current && messages.length > 0) {
            setTimeout(() => {
                chatContainerRef.current.scrollTo({
                    top: chatContainerRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            }, 100); // Delay to ensure UI updates first
        }
    }, [messages]);

    // Handle scroll event to load more messages
    const handleScroll = async (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;

        // If scrolled to the top and there are more messages to load
        if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
            // Save the current scroll height before fetching new messages
            const previousScrollHeight = scrollHeight;

            // Fetch older messages
            await fetchNextPage();

            // After fetching, adjust the scroll position to maintain the user's place
            if (chatContainerRef.current) {
                const newScrollHeight = chatContainerRef.current.scrollHeight;
                chatContainerRef.current.scrollTop =
                    newScrollHeight - previousScrollHeight;
            }
        }
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;
        const newMessage = {
            chatMessageId: Date.now(),
            senderId: userId,
            recipientId: recipient,
            content: input,
            timestamp: new Date().toISOString(),
        };
        WebSocketService.sendMessage('/app/send', newMessage);
        setInput('');
    };

    const handleRecipientChange = (userId) => {
        console.log('Recipient user changed:', userId);

        setRecipient(userId);
    };

    // Load initial messages
    useEffect(() => {
        // Load initial messages
        if (data) {
            const messages = data.pages.flat();
            setMessages(messages);
        }
    }, [data]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <SidebarBox
                sx={{
                    width: '300px',
                    height: '100vh',
                    backgroundColor: theme.palette.background.paper, // Sidebar background
                    borderRight: `2px solid ${theme.palette.accent.main}`, // Accent border
                    padding: 2,
                    boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)', // Sidebar shadow
                }}
            >
                {/* User List */}
                <List>
                    {chatRooms.map((chatRoom) => {
                        // Find the last message in the chat room
                        const lastMessage = chatRoom.lastMessage;

                        // Format last message text
                        let lastMessageText = lastMessage
                            ? lastMessage.senderId === userId
                                ? `You: ${lastMessage.content}`
                                : lastMessage.content
                            : 'No messages yet';

                        // Truncate long messages
                        const maxMessageLength = 20;
                        if (lastMessageText.length > maxMessageLength) {
                            lastMessageText =
                                lastMessageText.substring(0, maxMessageLength) +
                                '...';
                        }

                        // Format timestamp
                        const lastMessageTime = lastMessage
                            ? new Date(
                                  lastMessage.timestamp
                              ).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                              })
                            : '';

                        return (
                            <UserListItem
                                key={chatRoom.chatId}
                                onClick={() =>
                                    handleRecipientChange(chatRoom.userId)
                                }
                                sx={{
                                    backgroundColor:
                                        chatRoom.userId === recipient
                                            ? theme.palette.chat.received // Selected User Color
                                            : 'transparent',
                                    borderRadius: 3,
                                    cursor: 'pointer',
                                    padding: '12px 16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between', // Align timestamp
                                    transition: '0.3s',
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.chat.received,
                                    }, // Hover Effect
                                    borderBottom: `1px solid ${theme.palette.accent.main}`,
                                }}
                            >
                                {/* Left: User Avatar & Name */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexGrow: 1,
                                    }}
                                >
                                    {/* User Avatar */}
                                    <Avatar
                                        sx={{
                                            marginRight: 2,
                                            bgcolor: theme.palette.primary.main, // Avatar color
                                            width: 40,
                                            height: 40,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        {chatRoom.userId}
                                        {/* User initials */}
                                    </Avatar>

                                    {/* User Name & Last Message */}
                                    <ListItemText
                                        primary={`User ${chatRoom.userId}`}
                                        secondary={lastMessageText} // Show truncated last message
                                        sx={{
                                            color: theme.palette.secondary.main,
                                            '& .MuiTypography-body1': {
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                            },
                                            '& .MuiTypography-body2': {
                                                fontSize: '0.85rem',
                                                color: theme.palette.secondary
                                                    .light,
                                                opacity: 0.8,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis', // Ensures text truncates with '...'
                                                maxWidth: '130px', // Limit width so timestamp fits
                                            },
                                        }}
                                    />
                                </Box>

                                {/* Right: Timestamp */}
                                {lastMessage && (
                                    <Typography
                                        variant='caption'
                                        sx={{
                                            color: theme.palette.secondary
                                                .light,
                                            opacity: 0.7,
                                            fontSize: '0.75rem',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {lastMessageTime}
                                    </Typography>
                                )}
                            </UserListItem>
                        );
                    })}
                </List>
            </SidebarBox>

            {/* Chat Window */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: theme.palette.background.default, // Chat background
                    height: '100vh',
                }}
            >
                {/* Chat Header */}
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: theme.palette.primary.main, // Header in Brown-Orange
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {recipient === null ? (
                        <Typography variant='h6'>
                            Select a user to start chatting
                        </Typography>
                    ) : (
                        <Typography variant='h6'></Typography>
                    )}
                </Box>

                {/* Chat Messages */}
                <Box
                    ref={chatContainerRef}
                    sx={{
                        flex: 1,
                        padding: 2,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    onScroll={handleScroll}
                >
                    {recipient !== null &&
                        messages.map((message) => (
                            <Box
                                key={message.chatMessageId}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isSender(message.senderId)
                                        ? 'flex-end'
                                        : 'flex-start',
                                    marginBottom: 1.5,
                                }}
                            >
                                <Paper
                                    sx={{
                                        padding: 2,
                                        backgroundColor: isSender(
                                            message.senderId
                                        )
                                            ? theme.palette.chat.sent // Sent Message in Brown-Orange
                                            : theme.palette.chat.received, // Received Message in Soft Beige
                                        color: isSender(message.senderId)
                                            ? '#fff'
                                            : '#000',
                                        borderRadius: '18px',
                                        maxWidth: '65%',
                                        wordBreak: 'break-word',
                                        boxShadow:
                                            '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <Typography variant='body1'>
                                        {message.content}
                                    </Typography>
                                    {message.timestamp && (
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                display: 'block',
                                                marginTop: 0.5,
                                                textAlign: 'right',
                                                fontSize: '0.75rem',
                                                opacity: 0.7,
                                            }}
                                        >
                                            {new Date(
                                                message.timestamp
                                            ).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Typography>
                                    )}
                                </Paper>
                            </Box>
                        ))}
                </Box>

                {/* Message Input Box */}
                {recipient !== null && (
                    <Box
                        sx={{
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center',
                            borderTop: '1px solid #ccc',
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant='outlined'
                            placeholder='Type a message...'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            sx={{
                                marginRight: 1,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '18px', // Rounded Input
                                },
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: theme.palette.accent.main, // Accent Color
                                '&:hover': { backgroundColor: '#BF5F2F' }, // Darker shade on hover
                            }}
                            onClick={handleSendMessage}
                        >
                            Send
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

// Styled Box for the sidebar
const SidebarBox = styled(Box)(({ theme }) => ({
    width: '280px',
    backgroundColor: '#fafafa', // Darker background for the sidebar
    padding: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    height: '100vh',
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
