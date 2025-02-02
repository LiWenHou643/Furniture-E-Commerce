// websocketService.js

import { Stomp } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const useWebSocket = () => {
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/chat'); // Connect to the WebSocket endpoint
        const client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            setConnected(true); // Mark the connection as successful

            // Subscribe to the /topic/messages destination to receive messages
            client.subscribe('/topic/messages', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    receivedMessage,
                ]);
            });

            setStompClient(client);
        });

        // Cleanup on component unmount
        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected');
                    setConnected(false);
                });
            }
        };
    }, []);

    const sendMessage = (content) => {
        if (stompClient && connected) {
            stompClient.send('/app/send', {}, JSON.stringify({ content }));
        } else {
            console.log('Connection not established yet');
        }
    };

    return {
        connected,
        sendMessage,
        messages,
    };
};

export default useWebSocket;
