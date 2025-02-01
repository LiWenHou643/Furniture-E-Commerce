import { Box, Button, Typography } from '@mui/material';
import { Client } from '@stomp/stompjs';

let stompClient = null;

const ChatPage = () => {
    const connect = () => {
        // Create a STOMP client over native WebSocket
        stompClient = new Client({
            brokerURL: 'ws://localhost:8080/chat', // WebSocket URL
            debug: (str) => {
                console.log('STOMP Debug:', str);
            },
            reconnectDelay: 5000, // Reconnect after 5 seconds if disconnected
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        // Connect to the WebSocket server
        stompClient.onConnect = (frame) => {
            console.log('Connected to WebSocket!');
            stompClient.subscribe('/topic/messages', onMessageReceived);
            userJoin();
        };

        stompClient.onStompError = (frame) => {
            console.error('STOMP Error:', frame.headers.message);
        };

        stompClient.onWebSocketError = (error) => {
            console.error('WebSocket Error:', error);
        };

        stompClient.activate();
    };

    const userJoin = () => {
        const chatMessage = {
            chatId: Date.now(),
            senderId: 1,
            recipientId: 2,
            content: 'hello my friend!',
        };
        stompClient.publish({
            destination: '/app/sendMessage',
            body: JSON.stringify(chatMessage),
        });
    };

    const onMessageReceived = (payload) => {
        console.log('Message received:', payload.body);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant='h4' gutterBottom>
                Chat
            </Typography>
            <Button
                variant='contained'
                onClick={() => connect()}
                sx={{ mb: 2 }}
            >
                Connect
            </Button>
        </Box>
    );
};

export default ChatPage;
