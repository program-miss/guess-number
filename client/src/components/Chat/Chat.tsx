import { useGameContext } from '@/context/GameContext';
import { MessageData } from '@/types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import io from 'socket.io-client';
import { serverUrl } from '../../../data';
import Button from '../../ui/Button/Button';
import styles from './Chat.module.css';

const socket = io(serverUrl);

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState<string>('');
  const [isChatDisabled, setIsChatDisabled] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { myData, roundData, tableData } = useGameContext();

  const handleSendMessage = () => {
    if (input.trim() && !isChatDisabled) {
      socket.emit('send-chat-message', {
        message: input,
        userId: myData?.id,
        roundId: roundData?.id,
      });
      setInput('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isChatDisabled) {
      handleSendMessage();
    }
  };

  const getUserName = useMemo(
    () => (message: MessageData) => {
      return tableData.find((user) => user.user.id === message.userId)?.user
        .name;
    },
    [tableData]
  );

  useEffect(() => {
    socket.on('chat-message-received', (roundMessages: MessageData[]) => {
      setMessages(roundMessages);
    });

    return () => {
      socket.off('chat-message-received');
    };
  }, []);

  useEffect(() => {
    setIsChatDisabled(myData?.name ? false : true);
  }, [myData?.name]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container} ref={messagesEndRef}>
        {messages.map((message, index) => (
          <div key={index} className={styles.userWithTextContainer}>
            <div className={styles.userName}>{getUserName(message)}:</div>
            <div className={styles.chatText}>{message.message}</div>
          </div>
        ))}
      </div>
      <div className={styles.inputButtonContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder={isChatDisabled ? '' : 'Type your message...'}
          disabled={isChatDisabled}
        />
        <Button
          text="Send"
          onClick={handleSendMessage}
          disabled={isChatDisabled}
        />
      </div>
    </div>
  );
};

export default Chat;
