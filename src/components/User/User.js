import React from 'react';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';

import './User.css';

const UserChats = ({ user }) => {
  return (
    <div className="links">
      <NavLink to={`/user/${user.id}`}>
        <div className="userChats">
          <Avatar src={user.photoURL} />
          <div className="userChats-info">
            {user && (
              <>
                <h3>{user.name}</h3>
                <p>
                  {user.messages.length > 0 &&
                    user.messages[user.messages.length - 1].content}
                </p>
              </>
            )}
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default UserChats;
