import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// importando os componentes das paginas
import Welcome from './pages/Welcome/Welcome';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import RecommendationsPage from './pages/Recommendations/RecommendationsPage';
import NewGame from './pages/NewGame/NewGame';
import EditGame from './pages/EditGame/EditGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/recommendations" element={<RecommendationsPage />} />

        <Route path="/new-game" element={<NewGame />} />

        <Route path="/edit-game/:gameId" element={<EditGame />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;