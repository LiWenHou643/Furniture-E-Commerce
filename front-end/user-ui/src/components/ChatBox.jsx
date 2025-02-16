import { Box, Paper, TextField, Tooltip, Typography } from '@mui/material';

import ChatIcon from '@mui/icons-material/Chat';
import MinimizeIcon from '@mui/icons-material/Minimize';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import useFetchChat from '../hooks/useFetchChat';
import WebSocketService from '../services/WebSocketService';
import { userId } from '../utils/auth';
import { formatMessageTime } from '../utils/helper';
import Loading from './Loading';

const ChatBox = () => {
    const theme = useTheme();
    const currentUserId = userId();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useFetchChat(currentUserId, 1);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(true);

    // Ref to chat container for scrolling
    const chatContainerRef = useRef(null);

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

    const isSender = (senderId) =>
        parseInt(senderId, 10) === parseInt(currentUserId, 10);

    // WebSocket setup
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
        WebSocketService.connect(currentUserId);

        // Cleanup on unmount
        return () => {
            WebSocketService.disconnect();
        };
    }, [currentUserId]);

    // Load initial messages
    useEffect(() => {
        // Load initial messages
        if (data) {
            const messages = data.pages.flat();
            setMessages(messages);
        }
    }, [data]);

    // Scroll to the bottom when new messages arrive (only if user is already at bottom)
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    // Scroll to the bottom when chat is opened
    useEffect(() => {
        if (!isMinimized && chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [isMinimized]);

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        if (!currentUserId) return;

        const newMessage = {
            chatMessageId: Date.now(),
            senderId: currentUserId,
            recipientId: 1, // Hardcoded recipient for demo
            content: input,
            timestamp: new Date().toISOString(),
        };

        console.log('Sending message:', newMessage);

        // Send message to the server
        // WebSocketService.sendMessage('/app/send', newMessage);

        setInput('');
    };

    const toggleMinimize = () => {
        setIsMinimized((isMinimized) => !isMinimized);
    };

    if (isLoading) return <div></div>;

    return (
        <>
            {/* Floating chat icon */}
            {isMinimized && (
                <Tooltip title='Open Chat' arrow>
                    <IconButton
                        style={{
                            position: 'fixed',
                            zIndex: 1000,
                            bottom: 20,
                            right: 20,
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                        }}
                        onClick={() => toggleMinimize()}
                    >
                        <ChatIcon />
                    </IconButton>
                </Tooltip>
            )}

            {/* Chat Box */}
            {!isMinimized && (
                <Paper
                    elevation={3}
                    style={{
                        position: 'fixed',
                        zIndex: 1000,
                        bottom: 20,
                        right: 20,
                        width: '300px',
                        height: '400px',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                            borderBottom:
                                '1px solid ' + theme.palette.secondary.main,
                            backgroundColor: theme.palette.primary.main,
                            color: '#fff',
                        }}
                    >
                        <Typography variant='h6'>Customer Support</Typography>
                        <MinimizeIcon
                            onClick={() => toggleMinimize()}
                            style={{
                                color: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                    </Box>

                    {/* Chat messages */}
                    <Box
                        ref={chatContainerRef}
                        style={{
                            flexGrow: 1,
                            padding: '10px',
                            overflowY: 'auto',
                            maxHeight: '300px',
                            backgroundColor: theme.palette.background.default,
                        }}
                        onScroll={handleScroll}
                    >
                        {isFetchingNextPage && <Loading />}

                        {messages?.map((message) => (
                            <Box
                                key={message?.chatMessageId}
                                sx={{
                                    display: 'flex',
                                    justifyContent: isSender(message?.senderId)
                                        ? 'flex-end'
                                        : 'flex-start',
                                    marginBottom: 1.5,
                                }}
                            >
                                <Paper
                                    sx={{
                                        padding: 2,
                                        backgroundColor: isSender(
                                            message?.senderId
                                        )
                                            ? theme.palette.chat.sent // Sent Message in Brown-Orange
                                            : theme.palette.chat.received, // Received Message in Soft Beige
                                        color: isSender(message?.senderId)
                                            ? '#fff'
                                            : '#000',
                                        borderRadius: '18px',
                                        maxWidth: '70%',
                                        boxShadow:
                                            '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                        wordBreak: 'break-all', // Force long words to break and wrap
                                        wordWrap: 'break-word', // Wrap the word if necessary
                                    }}
                                >
                                    <Typography variant='body1'>
                                        {message?.content}
                                    </Typography>
                                    {message?.timestamp && (
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
                                            {formatMessageTime(
                                                message?.timestamp
                                            )}
                                        </Typography>
                                    )}
                                </Paper>
                            </Box>
                        ))}
                    </Box>

                    {/* Input area */}
                    <Box
                        style={{
                            display: 'flex',
                            padding: '10px',
                            borderTop:
                                '1px solid ' + theme.palette.secondary.main,
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant='outlined'
                            size='small'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Type a message...'
                            style={{ marginRight: '10px' }}
                            InputProps={{
                                style: {
                                    backgroundColor:
                                        theme.palette.background.default,
                                    borderRadius: '10px',
                                },
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <IconButton color='primary' onClick={handleSendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            )}
        </>
    );
};

export default ChatBox;
