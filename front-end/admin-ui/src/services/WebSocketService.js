import { Client } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // Replace with your backend URL
            connectHeaders: {},
            debug: function (str) {
                console.log(str);
            },
            onConnect: () => {
                console.log('Connected to WebSocket');

                // Notify the React component that the connection has been established
                this.isConnected = true;
                if (this.onConnectionChange) {
                    this.onConnectionChange(true);
                }

                // You can subscribe here after the connection is established
                this.client.subscribe('/topic/messages', (message) => {
                    const chatMessage = JSON.parse(message.body);
                    this.onMessageReceived(chatMessage);
                });

                console.log(`/user/${this.userId}/queue/messages`);
                // Subscribe to user-specific queue
                this.client.subscribe(
                    `/user/${this.userId}/queue/messages`,
                    (message) => {
                        const content = JSON.parse(message.body);
                        console.log('Message content:', content);

                        // Notify the React component that a new message has been received
                        if (this.onMessageReceived) {
                            this.onMessageReceived(content);
                        }
                    }
                );
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');

                // Notify the React component that the connection has been lost
                this.isConnected = false;
                if (this.onConnectionChange) {
                    this.onConnectionChange(false);
                }
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.isConnected = false;
    }

    connect(userId) {
        if (!this.client.active) {
            this.userId = userId;
            this.client.activate();
        }
    }

    disconnect() {
        this.client.deactivate();
    }

    sendMessage(destination, message) {
        // Check if the client is connected before sending
        if (this.client.active) {
            this.client.publish({
                destination: destination,
                body: JSON.stringify(message),
            });

            this.onMessageReceived(message);
        } else {
            console.log('Error: Not connected to WebSocket');
        }
    }

    subscribeToMessages(callback) {
        // Save the callback function for later use
        this.onMessageReceived = callback;
    }

    setConnectionChangeCallback(callback) {
        this.onConnectionChange = callback;
    }
}

export default new WebSocketService();
