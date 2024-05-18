import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ClothingPreferences from './components/ClothingPreferences';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/clothing-preferences" element={<ClothingPreferences/>}/>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
