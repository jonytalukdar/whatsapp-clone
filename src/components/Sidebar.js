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

function Sidebar() {
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
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
      </div>
    </div>
  );
}

export default Sidebar;
