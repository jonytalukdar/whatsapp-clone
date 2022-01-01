import React from 'react';
import { Button } from '@material-ui/core';
import useLogin from '../hooks/useLogin';

import './Login.css';

const Login = () => {
  const { signinWithGoogle } = useLogin();

  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png"
          alt="whatsapp"
        />

        <div className="login-text">
          <h1>Login To Whats App</h1>
        </div>

        <Button onClick={signinWithGoogle}>Log In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
