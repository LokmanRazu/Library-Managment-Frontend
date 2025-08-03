// src/app/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/', 
  withCredentials: true, // send cookies with requests
});

export default api;
