import React, { useContext, useState } from 'react';

import { InsertEmoticon, Mic, SendOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

import { AuthContext } from '../../context/AuthContext';
import useFireStore from '../../hooks/useFireStore';
import { Timestamp } from 'firebase/firestore';

const timestamp = Timestamp;

const ChatForm = ({ document }) => {
  const { user } = useContext(AuthContext);
  const { updateDocument, response } = useFireStore('rooms');

  //states
  const [message, setMessage] = useState('');

  //submit handler
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      creator: user.displayName,
      createdAt: timestamp.fromDate(new Date()),
      content: message,
      id: Math.random(),
    };

    await updateDocument(document.id, [...document.messages, newMessage]);

    if (!response.error) {
      setMessage('');
    }
  };

  return (
    <div className="chat-footer">
      <InsertEmoticon />
      <form onSubmit={handleSubmitMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message && (
          <Button variant="outlined" endIcon={<SendOutlined />}>
            Send
          </Button>
        )}
      </form>
      <Mic />
    </div>
  );
};

export default ChatForm;
