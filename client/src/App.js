import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default App;
