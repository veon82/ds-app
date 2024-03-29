import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import * as constants from '../const';
import './SessionsPage.css';

function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} minuti e ${remainingSeconds} secondi`;
}

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    axios.get(constants.apiSessions, config)
      .then(response => {
        const sortedSessions = response.data;
        setSessions(sortedSessions);
      })
      .catch(error => {
        console.error(error);
        toast.error("Impossibile caricare le sessioni");
      });
  }, []); 

  return (
    <div className="sessions-page">
    <h1>Storico delle Sessioni</h1>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Tempo Totale</th>
          {/* Aggiungi altre intestazioni di colonna se necessario */}
        </tr>
      </thead>
      <tbody>
        {sessions.map(session => (
          <tr key={session.id}>
            <td>{new Date(session.date).toLocaleString()}</td>
            <td>{secondsToMinutes(session.duration)}</td>
            {/* Aggiungi altre celle se necessario */}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default SessionsPage;
