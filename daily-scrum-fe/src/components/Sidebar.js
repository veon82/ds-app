// components/Sidebar.js
import React, { useState } from 'react';
import './Sidebar.css';
import { ReactComponent as DSIcon } from './icons/ds.svg';
import { ReactComponent as HistoryIcon } from './icons/history.svg';
import { ReactComponent as LoginIcon } from './icons/login.svg';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isExpanded && <span className="brand">DS-App</span>}
        <button className="toggle-button" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '<' : '>'}
        </button>
      </div>
      <div className="menu">
        <a href="/daily-scrum" className="menu-item">
          <DSIcon className="icon" />
          {isExpanded && <span className="text">Daily Scrum</span>}
        </a>
        <a href="/sessions" className="menu-item">
          <HistoryIcon className="icon" />
          {isExpanded && <span className="text">Sessioni</span>}
        </a>
        <a href="/login" className="menu-item">
          <LoginIcon className="icon" />
          {isExpanded && <span className="text">Login</span>}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
