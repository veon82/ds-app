// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Assicurati di creare il file CSS corrispondente

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/ds/sessions">Storico Sessioni</Link>
      <Link to="/ds/daily-scrum">DS</Link>
      <Link to="/ds/login">Login</Link>
    </div>
  );
};

export default Sidebar;
