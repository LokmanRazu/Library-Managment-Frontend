// src/app/axios.js
import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://library-managment-backend-8t6a.onrender.com/', 
  baseURL: 'http://localhost:3000/', 
  withCredentials: true, // send cookies with requests
});

export default api;
