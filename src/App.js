import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <div className="app-body">
        <Sidebar />
        <Routes>
          <Route path="/room/:id" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
