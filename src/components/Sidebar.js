import React, { useContext, useState } from 'react';
import useLogout from '../hooks/useLogout';

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
import useFireStore from '../hooks/useFireStore';

function Sidebar() {
  const { user } = useContext(AuthContext);
  const { addDocument } = useFireStore('rooms');
  const { signout } = useLogout();
  const { documents } = useCollection('rooms');
  // const [roomName, setRoomName] = useState('');

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
        <button onClick={signout}>logout</button>
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
        {/* {documents.length === 0 && <p>No Rooms Created Yet!</p>} */}
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
