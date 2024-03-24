import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import * as constants from '../const';
import './DailyScrumPage.css';

const TimerDuration = process.env.REACT_APP_TIMER_DURATION || 120; // Usa un valore di fallback se non definito

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 1) {
      return <div className="timer">Troppo tardi...</div>;
    } else if (remainingTime === 10){
      return <div className="timer">10 secondi...!</div>;
    }
  
    return (
      <div className="timer">
        <div className="text">Rimangono</div>
        <div className="value">{remainingTime}</div>
        <div className="text">secondi</div>
      </div>
    );
};

const DailyScrumPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [timer, setTimer] = useState(TimerDuration);
  const [startTime, setStartTime] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  const fetchUsers = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const response = await axios.get(constants.apiUsers, config);

      setUsers(response.data.users);
      setIsSessionActive(true); // Avvia la sessione solo dopo aver recuperato gli utenti
      selectRandomUser(response.data.users); // Seleziona il primo utente randomicamente
    } catch (error) {
        console.error('Errore durante il recupero degli utenti', error);
        if (error.response.status === 403) {
            error.message = "utente non autenticato, effettuare la login";
        }
        toast.error("Errore: " + error.message);
    }
  }, []);

  const selectRandomUser = (usersArray) => {
    // Effettua una copia dell'array per evitare di modificare lo stato direttamente
    let tempUsers = [...usersArray];

    if (tempUsers.length > 0) {
      const randomIndex = Math.floor(Math.random() * tempUsers.length);
      const selectedUser = tempUsers.splice(randomIndex, 1)[0];
      setCurrentUser(selectedUser); // Aggiorna l'utente corrente
      setUsers(tempUsers); // Aggiorna l'array degli utenti senza l'utente selezionato
      console.log('Current user: ' + selectedUser.username);
      // Nota: Qui non è necessario chiamare setTimer perché `key` cambierà
      // ciò provocherà il re-render del componente CountdownCircleTimer che resettare il timer
    } else {
      toast.info("La sessione di oggi è terminata...🧑‍💻");
      endSession();
    }
  };

  const nextUser = useCallback(() => {
    const now = Date.now();
    const timeSpent = startTime ? Math.floor((now - startTime) / 1000) : 0;
    console.log('Time spent for ' + currentUser.username + ':', timeSpent);

    setTotalTimeSpent(prevTotal => prevTotal + timeSpent);

    selectRandomUser(users); // Dovrebbe anche impostare una nuova chiave per il CountdownCircleTimer
    setStartTime(now); // Aggiorna l'inizio del turno per il prossimo utente
  }, [users, startTime]);

  const endSession = useCallback(async () => {

    // Calcola il tempo speso per l'ultimo utente prima di terminare la sessione
    const now = Date.now();
    const finalUserTimeSpent = startTime ? Math.floor((now - startTime) / 1000) : 0;
    console.log('Time spent for the last user:', finalUserTimeSpent);

    // Assicurati di aggiungere il tempo dell'ultimo utente al totalTimeSpent
    const finalTotalTimeSpent = totalTimeSpent + finalUserTimeSpent;

    // Salva il tempo totale alla fine della sessione
    try {
        const currentDate = new Date();
        const isoDate = currentDate.toISOString();

        await axios.post(constants.apiSessions, {
            duration: finalTotalTimeSpent,
            date: isoDate
        }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        });

    } catch (error) {
        // Gestisci errori di rete/API qui...
    } finally {
        setIsSessionActive(false);
        setCurrentUser(null);
        setTotalTimeSpent(0);
        setTimer(TimerDuration);
    }
  }, [totalTimeSpent, startTime]);

  const startSession = useCallback(() => {
    if (!isSessionActive) {
      fetchUsers(); // Esegui il fetch degli utenti al click su "Avvia"
      setStartTime(Date.now()); // Imposta l'inizio del turno per il primo utente
    }
  }, [isSessionActive, fetchUsers]);

  const handleComplete = () => {
    nextUser();
    return { shouldRepeat: false, delay: 0 };
  };

  return (
    <div className="daily-scrum-page">
      {!isSessionActive ? (
        <button className="start-button" onClick={startSession}>Avvia</button>
      ) : (
        <div>
          <div className="session-info">
            <div className="user-image">
                {currentUser?.image_path && (
                    <img src={`${constants.backendUrl}/${currentUser.image_path}`} alt={`Immagine di ${currentUser.username}`} />
                )}
            </div>
            <h2 className="username">{currentUser?.username}</h2>
          </div>
          <div className="timer-wrapper">
            <CountdownCircleTimer
                key={currentUser?.id || Date.now()} // Aggiorna la key con l'ID dell'utente corrente o con un timestamp per forzare il re-render
                isPlaying
                duration={TimerDuration}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[TimerDuration, parseInt(TimerDuration*0.5), parseInt(TimerDuration*0.75), 0]}
                onComplete={handleComplete}
                >
                {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="next-button-container">
            <button className="next-button" onClick={nextUser} disabled={timer === 0}>Next</button>
          </div>
        </div>
      )}
    </div>
  );

};

export default DailyScrumPage;
