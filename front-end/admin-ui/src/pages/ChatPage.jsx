import { Stomp } from '@stomp/stompjs'; // Correct import of Stomp
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client'; // Import SockJS

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
        // Create SockJS connection
        const socket = new SockJS('http://localhost:8080/chat'); // Ensure this URL is correct for your backend

        // Pass the SockJS connection to Stomp
        const stompClient = Stomp.over(socket); // This is the key change!

        // Connect using Stomp
        stompClient.connect(
            {},
            (frame) => {
                console.log('Connected: ' + frame);

                // Subscribe to the /topic/messages destination
                stompClient.subscribe('/topic/messages', (messageOutput) => {
                    setMessage(messageOutput.body); // Set the message from the server
                });
            },
            (error) => {
                console.error('Connection error: ', error); // Log any connection errors
            }
        );

        // Store the stompClient so you can disconnect later
        setClient(stompClient);

        // Cleanup function to disconnect when the component unmounts
        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <div>
            <h2>Real-Time Messages</h2>
            <p>{message}</p>
        </div>
    );
};

export default ChatPage;
