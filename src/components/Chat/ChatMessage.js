import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ChatMessage = ({ document }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {document.messages.map((message) => {
        return (
          <div className="chat-body" key={message.id}>
            <p
              className={`chat-message ${
                user.displayName === message.creator
              } && chat-receiver`}
            >
              <span className="chat-name">{message.creator}</span>
              {message.content}
              <span className="chat-timestamp">4.12pm</span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default ChatMessage;
