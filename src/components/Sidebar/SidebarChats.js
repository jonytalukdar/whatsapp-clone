import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

import './SidebarChats.css';
import { Link } from 'react-router-dom';

const SidebarChats = ({ room }) => {
  const [seed, setSeed] = useState('');

  const lastMessage = room.messages[room.messages.length - 1].content;

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <>
      <Link to={`/room/${room.id}`}>
        <div className="sidebarChats">
          <Avatar
            src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
          />
          <div className="sidebarChats-info">
            <h3>{room.name}</h3>
            <p>{lastMessage}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SidebarChats;
