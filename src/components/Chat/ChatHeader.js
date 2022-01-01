import React, { useEffect, useState } from 'react';

import { Avatar, IconButton } from '@mui/material';
import { MoreVert, SearchOutlined, AttachFile } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

const ChatHeader = ({ document }) => {
  const [seed, setSeed] = useState('');

  const lastSeen = document.messages[document.messages.length - 1].createdAt;

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="chat-header">
      <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} />

      <div className="chat-headerInfo">
        <h3>{document && document.name}</h3>
        <p>
          last seen
          <span>
            {formatDistanceToNow(lastSeen.toDate(), {
              addSuffix: true,
            })}
          </span>
        </p>
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
