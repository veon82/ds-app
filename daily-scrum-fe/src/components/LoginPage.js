import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as constants from '../const';
import './LoginPage.css';
import { AuthContext } from '../AuthProvider';

const LoginPage = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, status } = await axios.post(constants.apiLogin, { username, password });
      if (status === 200) {
        login(data.accessToken);
        navigate('/daily-scrum');
      } else {
        toast.error('Login non riuscito: Status Code ' + status);
      }
    } catch (error) {
      toast.error('Login fallito: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Accedi con le tue credenziali</h2>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
        <button onClick={handleLogin}>Accedi</button>
        {/* <div className="login-links">
          <Link to="/register">Registrati</Link>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
