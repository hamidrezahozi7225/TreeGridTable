import axios from 'axios';

const token = JSON.parse(localStorage.getItem('token'));
export const axiosInstance = axios.create({
  headers: {
    Auth: 'TestOrgAminUser:22d4f8a8a12c417bb266db860c96bdafa60d91365c0f45cb9b41e4cdd4e0a503',
    'Content-Type': 'application/json',
  },
});
