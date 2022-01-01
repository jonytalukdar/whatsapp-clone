import React, { useContext } from 'react';

import './Siderbar.css';

import { IconButton, Avatar } from '@mui/material';
import { SearchOutlined, ChatOutlined, DonutLarge } from '@mui/icons-material';

import SidebarChats from './SidebarChats';
import useCollection from '../../hooks/useCollection';
import { AuthContext } from '../../context/AuthContext';
import useFireStore from '../../hooks/useFireStore';
import MenuBar from '../Menu/Menu';

function Sidebar() {
  const { user } = useContext(AuthContext);
  const { addDocument } = useFireStore('rooms');

  const { documents } = useCollection('rooms');

  //create chat function
  const createChat = (e) => {
    const roomName = prompt('Please enter room name for chat');

    if (roomName) {
      addDocument({ name: roomName, creator: user.displayName, messages: [] });
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
          {/* menu bar */}
          <MenuBar />
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
          <h2>Create New Room</h2>
        </div>
        {/* {documents.length === 0 && <p>No Rooms Created Yet!</p>} */}
        {documents &&
          documents.map((room) => {
            return <SidebarChats key={room.id} room={room} />;
          })}
      </div>
    </div>
  );
}

export default Sidebar;
