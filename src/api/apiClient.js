// src/apiClient.js
import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'http://ec2-54-158-228-70.compute-1.amazonaws.com', // Replace with your backend API URL
});


// Add a request interceptor to include the JWT from sessionStorage
apiClient.interceptors.request.use(

    (config) => {
        const token = sessionStorage.getItem('token');

        // Retrieve token from sessionStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
