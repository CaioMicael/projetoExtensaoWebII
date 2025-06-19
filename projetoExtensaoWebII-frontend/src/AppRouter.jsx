import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Campaigns from './pages/Campaigns';
import Organizations from './pages/Organizations';
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doacoes" element={<Donations />} />
          <Route path="/campanhas" element={
            <ProtectedRoute>
              <Campaigns />
            </ProtectedRoute>
          } />
          <Route path="/organizacoes" element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;
