import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://671a5bf5acf9aa94f6aa5599.mockapi.io/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})
