import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Usa useNavigate se sei su react-router-dom v6
import { toast } from 'react-toastify';

import * as constants from '../const';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); // Per la navigazione programmata

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      toast.error('Le password non coincidono.');
      return;
    }

    // Crea un oggetto FormData per inviare i dati del file e del form
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    if (image) {
      formData.append('image', image); // Aggiungi l'immagine solo se è stata selezionata
    }

    try {
      const { data } = await axios.post(constants.apiRegister, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Registrazione avvenuta con successo!');

      localStorage.setItem('token', data.accessToken); // Salva il token nel localStorage

      navigate('/login'); // Reindirizza alla pagina di login
    } catch (error) {
        toast.error('Registrazione fallita');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registrati</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="password" placeholder="Conferma Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleRegister}>Registrazione</button>
      </div>
    </div>
  );
};

export default RegisterPage;
