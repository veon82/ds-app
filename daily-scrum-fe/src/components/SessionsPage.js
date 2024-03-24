import React, { useState, useEffect } from 'react';
import axios from 'axios';

import * as constants from '../const';
import './SessionsPage.css';

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
        console.log(response);
        // Supponendo che la risposta sia un array di oggetti sessione e che ogni sessione abbia un timestamp
        const sortedSessions = response.data;
        setSessions(sortedSessions);
        console.log(sortedSessions);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 

  return (
    <div className="sessions-page">
    <h1>Storico delle Sessioni</h1>
    <table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Tempo Totale (sec)</th>
          {/* Aggiungi altre intestazioni di colonna se necessario */}
        </tr>
      </thead>
      <tbody>
        {sessions.map(session => (
          <tr key={session.id}>
            <td>{new Date(session.date).toLocaleString()}</td>
            <td>{session.duration}</td>
            {/* Aggiungi altre celle se necessario */}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default SessionsPage;
