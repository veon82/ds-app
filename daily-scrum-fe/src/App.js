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
          <Route path="/ds/login" element={<LoginPage />} />
          <Route path="/ds/register" element={<RegisterPage />} />
          <Route path="/ds/sessions" element={<SessionsPage />} />
          <Route path="/ds/daily-scrum" element={<DailyScrumPage />} />
          <Route path="/ds" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
