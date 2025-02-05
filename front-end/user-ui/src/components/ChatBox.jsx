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
        content:
            'g oglleaaaaaaaadwadddddd oglleaaaaaaaadwadddddd oglleaaaaaaaadwadddddd',
        timestamp: '2025-02-03T20:07:15',
    },
    {
        chatMessageId: 4,
        chatId: '1_2',
        senderId: 2,
        recipientId: 1,
        content: 'f uckkaaaaaaaadwadddddd',
        timestamp: '2025-02-03T20:06:30',
    },
    {
        chatMessageId: 5,
        chatId: '1_2',
        senderId: 2,
        recipientId: 1,
        content: 'nannnaaa aaaaadwadddddd',
        timestamp: '2025-02-03T20:07:30',
    },
];

const ChatBox = () => {
    const theme = useTheme();
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useFetchChat(userId(), 1);
    const [messages, setMessages] = useState(chatMessages);
    const [isConnected, setIsConnected] = useState(false);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);

    // Ref for the message container
    const messagesEndRef = useRef(null);
    const observerRef = useRef(null);

    const isSender = (senderId) => senderId === userId();

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
    }, []);

    useEffect(() => {
        // Scroll to the bottom whenever messages are updated
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // Runs whenever the messages state changes

    useEffect(() => {
        // Scroll to the bottom when the chatbox is first opened (when it's maximized)
        if (!isMinimized && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isMinimized]); // Runs when the chatbox is opened

    // IntersectionObserver to detect when the top of the chat container is visible
    useEffect(() => {
        const currentRef = messagesEndRef.current;

        observerRef.current = new IntersectionObserver(loadMoreMessages, {
            root: null, // observe relative to the viewport
            rootMargin: '100px', // trigger when we are 100px away from the top
            threshold: 1.0, // trigger when the top of the box reaches 100% of the container
        });

        // Start observing the top of the chat container
        if (currentRef) {
            observerRef.current.observe(currentRef);
        }

        // Cleanup observer on component unmount
        return () => {
            if (observerRef.current && currentRef) {
                observerRef.current.unobserve(currentRef);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, loadMoreMessages]);

    if (isLoading) return <div>Loading...</div>;

    console.log('fetching chat data: -----------------', data);

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const newMessage = {
            chatMessageId: Date.now(),
            senderId: userId,
            recipientId: 1, // Hardcoded recipient for demo
            content: input,
            timestamp: new Date().toISOString(),
        };

        // Send message to the server
        // WebSocketService.sendMessage(newMessage);

        // Update UI
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInput('');
    };

    const toggleMinimize = () => {
        setIsMinimized((isMinimized) => !isMinimized);
    };

    // This will be used for the infinite scroll (loading older messages when scrolling to the top)
    const loadMoreMessages = (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };
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
                        style={{
                            flexGrow: 1,
                            padding: '10px',
                            overflowY: 'auto',
                            maxHeight: '300px',
                            backgroundColor: theme.palette.background.default,
                        }}
                    >
                        {messages.map((message) => (
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
                                        maxWidth: '70%',
                                        boxShadow:
                                            '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                        wordBreak: 'break-all', // Force long words to break and wrap
                                        wordWrap: 'break-word', // Wrap the word if necessary
                                        whiteSpace: 'normal', // Allow normal wrapping behavior
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
                                {/* The ref here ensures we scroll to the last message */}
                                <div ref={messagesEndRef} />
                            </Box>
                        ))}

                        {/* This div is the target for intersection observer to trigger loading more messages */}
                        {hasNextPage && !isFetchingNextPage && (
                            <div
                                ref={messagesEndRef}
                                style={{ height: 10, width: '100%' }}
                            />
                        )}

                        {/* Display Loading Spinner for Next Page */}
                        {isFetchingNextPage && (
                            <div>Loading more messages...</div>
                        )}
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
