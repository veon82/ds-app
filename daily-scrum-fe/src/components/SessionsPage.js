import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as constants from '../const';
import './SessionsPage.css';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };
      const { data } = await axios.get(constants.apiSessions, config);
      setSessions(data);
    };

    fetchSessions();
  }, []);

  return (
    <div className="sessions-page">
      <h1>Sessioni di Daily Scrum</h1>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>{session.username}: {session.duration} minuti</li>
        ))}
      </ul>
    </div>
  );
};

export default SessionsPage;
