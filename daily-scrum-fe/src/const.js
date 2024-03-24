// src/const.js

export const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000';
export const backendApiUrl = `${backendUrl}/api`;
export const apiUsers = `${backendApiUrl}/users`;
export const apiSessions = `${backendApiUrl}/sessions`;
export const apiLogin = `${backendApiUrl}/login`;
export const apiRegister = `${backendApiUrl}/register`;
