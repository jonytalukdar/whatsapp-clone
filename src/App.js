import { useContext } from 'react';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';

import './App.css';

function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="app">
      <div className="app-body">
        {user && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />

          <Route
            path="/room/:id"
            element={user ? <Chat /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
