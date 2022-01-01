import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {
  MoreVert,
  SearchOutlined,
  AttachFile,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons';

import './Chat.css';
import useDocument from '../hooks/useDocument';

const Chat = () => {
  //states
  const [seed, setSeed] = useState('');
  const [message, setMessage] = useState('');

  const { id } = useParams();
  const { document } = useDocument('rooms', id);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // await updateDocument(project.id, [...rooms.comments, newComment]);
    console.log(message);
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
        />

        <div className="chat-headerInfo">
          <h3>{document && document.name}</h3>
          <p>last seen</p>
        </div>

        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
        <p className="chat-message">
          <span className="chat-name">Jerry Jean</span>
          hello everyone
          <span className="chat-timestamp">4.12pm</span>
        </p>

        <p className="chat-receiver">
          <span className="chat-name">Jerry Jean</span>
          hello everyone
          <span className="chat-timestamp">4.12pm</span>
        </p>
      </div>

      {/* chat foooter */}
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
    </div>
  );
};

export default Chat;
