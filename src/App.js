import { useContext } from 'react';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AuthContext } from './context/AuthContext';

import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app">
      <div className="app-body">
        {user && <Sidebar />}
        <Routes>
          <Route path="/room/:id" element={<Chat />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
