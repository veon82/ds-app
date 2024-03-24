import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import * as constants from '../const';
import './DailyScrumPage.css';

const TimerDuration = 12; // Durata del timer in secondi

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
  const [isSessionActive, setIsSessionActive] = useState(false);
//   const [error, setError] = useState(""); // Stato per tenere traccia degli errori

  const fetchUsers = useCallback(async () => {
    // console.log(`Fetching users with token: ${localStorage.getItem('token')}`);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    try {
      const response = await axios.get(constants.apiUsers, config);

      console.log(response.data.users);

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

  const selectRandomUser = useCallback((usersArray) => {
    if (usersArray.length > 0) {
      const randomIndex = Math.floor(Math.random() * usersArray.length);
      const selectedUser = usersArray.splice(randomIndex, 1)[0];
      setCurrentUser(selectedUser); // Assumendo che l'oggetto utente abbia una proprietà "username"

      console.log("picked " + selectedUser.username + " " + selectedUser.id + selectedUser.image_path);

      setTimer(TimerDuration); // Reimposta il timer
    } else {
      toast.info("La sessione di oggi è terminata... Andate in pace! 🧑‍💻");
      endSession();
    }
  }, []);

  const nextUser = useCallback(() => {
    // Logica per passare al prossimo utente e salvare la sessione corrente
    // ...
    selectRandomUser(users);
    setTimer(TimerDuration);
  }, [users, selectRandomUser]);

  const endSession = useCallback(() => {
    setIsSessionActive(false);
    setCurrentUser(null);
    // Eventuali altre operazioni di pulizia
    setTimer(TimerDuration);
  }, []);

  const startSession = () => {
    if (!isSessionActive) {
      fetchUsers(); // Esegui il fetch degli utenti al click su "Avvia"
    }
  };

  useEffect(() => {
    if (timer === 0) {
      nextUser();
    } else {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId); // Clear the timeout if the component unmounts
    }
  }, [timer, nextUser]);

  return (
    <div className="daily-scrum-page">
      {!isSessionActive ? (
        <button onClick={startSession}>Avvia</button>
      ) : (
        <div>
          {currentUser?.image_path && (
            <img src={`${constants.backendUrl}/${currentUser.image_path}`} alt={`Immagine di ${currentUser.username}`} />
          )}
          <h2>{currentUser?.username}</h2>

          {/* Countdown Timer */}
          <div className="timer-container">
          <CountdownCircleTimer
            isPlaying
            duration={TimerDuration}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[TimerDuration, parseInt(TimerDuration*0.5), parseInt(TimerDuration*0.75), 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            >
            {renderTime}
          </CountdownCircleTimer>
          </div>

          <button onClick={nextUser} disabled={timer === 0}>Next</button>
        </div>
      )}
    </div>
  );

};

export default DailyScrumPage;
