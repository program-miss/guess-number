import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { serverUrl } from '../../../data';
import Button from '../../ui/Button';
import styles from './Chat.module.css';

const socket = io(serverUrl);

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    socket.on('chat-message-received', (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off('chat-message-received');
    };
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      socket.emit('send-chat-message', input);
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {messages.map((message, index) => (
          <div key={index} className={styles.chatText}>{message}</div>
        ))}
      </div>
      <div className={styles.inputButtonContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Type your message..."
        />
        <Button text="Send" onClick={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
