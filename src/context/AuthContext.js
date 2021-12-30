import React, { createContext, useEffect, useReducer } from 'react';
import { app } from '../firebase/Firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(app);

export const AuthContext = createContext();

//reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, user: action.payload };
    }
    case 'LOGOUT': {
      return { ...state, user: null };
    }

    case 'AUTH_IS_READY': {
      return { ...state, user: action.payload, authIsReady: true };
    }

    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  //states
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  //onAuthStateChanged
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });

      unSubscribe();
    });
  }, []);

  //context value
  const conextValue = {
    user: state.user,
    authIsReady: state.authIsReady,
    dispatch,
  };
  return (
    <AuthContext.Provider value={conextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
