import React, { useContext, useState } from 'react';

import { InsertEmoticon, Mic } from '@material-ui/icons';

import { AuthContext } from '../../context/AuthContext';
import useFireStore from '../../hooks/useFireStore';
import { Timestamp } from 'firebase/firestore';

const timestamp = Timestamp;

const ChatForm = () => {
  const { user } = useContext(AuthContext);
  const { updateDocument } = useFireStore('rooms');

  //states
  const [message, setMessage] = useState('');

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    const newMessage = {
      creator: user.displayName,
      createdAt: timestamp.fromDate(new Date()),
      content: message,
      id: Math.random(),
    };

    await updateDocument([newMessage]);
    console.log('success');
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
        <button type="submit">Send Message</button>
      </form>
      <Mic />
    </div>
  );
};

export default ChatForm;
