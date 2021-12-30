import React from 'react';

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

function Sidebar() {
  const { documents } = useCollection('rooms');

  return (
    <div className="sidebar">
      {/* header */}
      <div className="sidebar-header">
        <Avatar />
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
        {documents &&
          documents.map((room) => {
            // return <Sidebar room={room} />;
            return <SidebarChats key={room.id} room={room} />;
          })}
      </div>
    </div>
  );
}

export default Sidebar;
