import React, { useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const ChatMessage = ({ documents }) => {
  const { user } = useContext(AuthContext);

  console.log(documents);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [documents]);

  return (
    <>
      <div className="chat-body">
        {documents.map((message, i) => {
          return (
            <p
              ref={messagesEndRef}
              key={i}
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
