import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
export const axiosInstance = axios.create({
  headers: {
    Auth: 'TestOrgAminUser:c46b281a980a461c8d8c6aeffeaa5f4ab0d4d2a494f1457b97cba6d77018a804',
    'Content-Type': 'application/json',
  },
});
