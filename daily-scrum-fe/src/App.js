import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SessionsPage from './components/SessionsPage';
import DailyScrumPage from './components/DailyScrumPage';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/daily-scrum" element={<DailyScrumPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
