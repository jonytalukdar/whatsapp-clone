import React, { useContext, useState } from 'react';

import './Siderbar.css';
import { IconButton, Avatar } from '@material-ui/core';
import {
  DonutLarge,
  ChatOutlined,
  MoreVert,
  SearchOutlined,
} from '@material-ui/icons';
import SidebarChats from './SidebarChats';
import useCollection from '../hooks/useCollection';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
  const { user } = useContext(AuthContext);
  const { documents } = useCollection('rooms');
  const [roomName, setRoomName] = useState('');
  //create chat function
  const createChat = (e) => {
    const roomName = prompt('Please enter room name for chat');

    if (roomName) {
      setRoomName(roomName);
    }
  };

  return (
    <div className="sidebar">
      {/* header */}
      <div className="sidebar-header">
        <Avatar src={user.photoURL} />
        <div className="sidebar-rightSide">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* sidebar search */}
      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start chat" />
        </div>
      </div>

      {/* chats rooms */}
      <div className="sidebar-chats">
        <div className="sidebarChats" onClick={createChat}>
          <h2>Add New Chat</h2>
        </div>
        {documents &&
          documents.map((room) => {
            return (
              <SidebarChats
                key={room.id}
                room={room}
                addNewChat={() => console.log('hello')}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Sidebar;
