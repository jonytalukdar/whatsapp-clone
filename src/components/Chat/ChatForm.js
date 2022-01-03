import React, { useContext, useState } from 'react';

import {
  InsertEmoticon,
  Mic,
  SendOutlined,
  CancelOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import Picker from 'emoji-picker-react';

import { AuthContext } from '../../context/AuthContext';
import useFireStore from '../../hooks/useFireStore';
import { Timestamp } from 'firebase/firestore';

const timestamp = Timestamp;

const ChatForm = ({ document }) => {
  const { user } = useContext(AuthContext);
  const { updateDocument, response } = useFireStore('rooms');

  //states
  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);

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
    setShowPicker(false);
  };

  //emoji picker
  const onEmojiClick = (e, emojiObject) => {
    setMessage((prevState) => prevState + emojiObject.emoji);
  };

  return (
    <div className="chat-footer">
      <InsertEmoticon
        onClick={() => setShowPicker((val) => !val)}
        style={{ cursor: 'pointer' }}
      />
      {showPicker && (
        <div className="emoji-picker">
          <Picker onEmojiClick={onEmojiClick} />

          <CancelOutlined onClick={() => setShowPicker(false)} />
        </div>
      )}

      <form onSubmit={handleSubmitMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message && (
          <Button type="submit" variant="outlined" endIcon={<SendOutlined />}>
            Send
          </Button>
        )}
      </form>

      <Mic />
    </div>
  );
};

export default ChatForm;
