import { useContext } from 'react';
import RoomChat from './components/Chat/RoomChat';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';

import './App.css';
import UserChat from './components/Chat/UserChat';

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  return (
    <div className="app">
      <div className="app-body">
        {user && <Sidebar />}
        {authIsReady && (
          <Routes>
            <Route
              path="/"
              element={user ? <RoomChat /> : <Navigate to="/login" />}
            />

            <Route
              path="/room/:id"
              element={user ? <RoomChat /> : <Navigate to="/login" />}
            />

            <Route
              path="/user/:id"
              element={user ? <UserChat /> : <Navigate to="/login" />}
            />

            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
