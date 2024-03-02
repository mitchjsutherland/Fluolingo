import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ImageGuess from './imageguess';
import Register from './Register/Register';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Home from './Home/Home';
import MultiChoice from './components/MultiChoice';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/multichoice" element={<MultiChoice />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/dashboard" element={<Dashboard user="Filip" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
