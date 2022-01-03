import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

import './SidebarChats.css';
import { Link, NavLink } from 'react-router-dom';

const SidebarChats = ({ room }) => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <div className="links">
      <NavLink to={`/room/${room.id}`}>
        <div className="sidebarChats">
          <Avatar
            src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
          />
          <div className="sidebarChats-info">
            {room && (
              <>
                <h3>{room.name}</h3>
                <p>
                  {room.messages.length > 0 &&
                    room.messages[room.messages.length - 1].content}
                </p>
              </>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarChats;
