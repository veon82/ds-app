import { jwtDecode } from 'jwt-decode';

export const getUserFromJWT = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
  
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        return null;
      }
      return decoded.name;
    } catch (error) {
      console.error('Errore nella decodifica del token JWT:', error);
      return null;
    }
}

