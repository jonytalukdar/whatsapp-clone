import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ChatMessage = ({ document }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="chat-body">
        {document.messages.map((message) => {
          return (
            <p
              key={message.id}
              className={`chat-message ${
                user.displayName === message.creator
              } && chat-receiver`}
            >
              <span className="chat-name">{message.creator}</span>
              {message.content}
              <span className="chat-timestamp">4.12pm</span>
            </p>
          );
        })}
      </div>
    </>
  );
};

export default ChatMessage;
