import React, { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';

import './SidebarChats.css';

const SidebarChats = ({ room }) => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="sidebarChats">
      <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} />
      <div className="sidebarChats-info">
        <h2>{room.name}</h2>
        <p>last message....</p>
      </div>
    </div>
  );
};

export default SidebarChats;
