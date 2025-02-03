import {
    Button,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import WebSocketService from '../services/WebSocketService';

const ChatPage = () => {
    const [userId, setUserId] = useState(1);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [recipientId, setRecipientId] = useState(0);
    const [isConnected, setIsConnected] = useState(false);

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
            recipientId: recipientId,
            content: input,
        };
        console.log('Sending:', raw);
        WebSocketService.sendMessage('/app/send', raw);
    };

    return (
        <Container>
            <Typography variant='h4' gutterBottom align='center'>
                React WebSocket with STOMP
            </Typography>

            <Grid container spacing={2} justifyContent='center'>
                {isConnected ? (
                    <>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Send to user ID'
                                value={recipientId}
                                onChange={(e) => setRecipientId(e.target.value)}
                                variant='outlined'
                                sx={{ mb: 2 }}
                            />

                            <TextField
                                fullWidth
                                label='Type a message'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                variant='outlined'
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                onClick={handleSendMessage}
                                disabled={!input.trim()}
                            >
                                Send
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant='h6'>Messages:</Typography>
                            <List>
                                {messages.map((msg, index) => (
                                    <ListItem key={index}>
                                        <Typography>{msg.content}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12} align='center'>
                        <CircularProgress />
                        <Typography>Connecting...</Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default ChatPage;
