import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importando os componentes das páginas
import Welcome from './pages/Welcome/Welcome';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal '/' agora mostra a página de Boas-Vindas */}
        <Route path="/" element={<Welcome />} />

        {/* Criamos uma nova rota '/auth' para a página de Login/Cadastro */}
        <Route path="/auth" element={<Auth />} />

        {/* Placeholder para a rota do dashboard que criaremos depois */}
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />

        {/* Qualquer outra rota redireciona para a página inicial */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;