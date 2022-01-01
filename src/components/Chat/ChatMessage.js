import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const ChatMessage = ({ document }) => {
  const { user } = useContext(AuthContext);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [document.messages]);

  return (
    <>
      <div className="chat-body">
        {document.messages.map((message) => {
          return (
            <p
              ref={messagesEndRef}
              key={message.id}
              className={`${
                user.displayName === message.creator
                  ? 'chat-receiver'
                  : 'chat-message'
              }`}
            >
              <span className="chat-name">{message.creator}</span>
              {message.content}
              <span className="chat-timestamp">
                {formatDistanceToNow(message.createdAt.toDate(), {
                  addSuffix: true,
                })}
              </span>
            </p>
          );
        })}
      </div>
    </>
  );
};

export default ChatMessage;
