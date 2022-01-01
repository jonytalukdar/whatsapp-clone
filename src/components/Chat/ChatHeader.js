import React, { useEffect, useState } from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import { MoreVert, SearchOutlined, AttachFile } from '@material-ui/icons';

const ChatHeader = ({ document }) => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat-header">
      <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} />

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
  );
};

export default ChatHeader;
