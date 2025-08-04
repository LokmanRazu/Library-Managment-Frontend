// src/app/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://library-managment-backend-8t6a.onrender.com/', 
  withCredentials: true, // send cookies with requests
});

export default api;
