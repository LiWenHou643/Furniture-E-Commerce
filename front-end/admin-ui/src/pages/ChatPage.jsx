import { useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';

const ChatPage = () => {
    const { connected, sendMessage, messages } = useWebSocket();
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        sendMessage(input);
        setInput('');
    };

    return (
        <div>
            <h1>React WebSocket with STOMP</h1>
            {connected ? (
                <div>
                    <div>
                        <input
                            type='text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Type a message'
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                    <h3>Messages:</h3>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg.content}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Connecting...</p>
            )}
        </div>
    );
};

export default ChatPage;
