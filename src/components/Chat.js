import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
  MoreVert,
  SearchOutlined,
  AttachFile,
  InsertEmoticon,
  Mic,
} from '@material-ui/icons';

import './Chat.css';

const Chat = () => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar
          src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
        />

        <div className="chat-headerInfo">
          <h3>room name</h3>
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

      <div className="chat-footer">
        <InsertEmoticon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button type="submit">Send Message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
