// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5000'
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = localStorage.getItem('token');
//         if (accessToken) {
//             config.headers.token = accessToken;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust as necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include the token in each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

