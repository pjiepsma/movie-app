import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmJkZTFmM2JhYjU4NmYzMDU3OGRmZGY5OWI0Zjk2MCIsIm5iZiI6MTczNzEwNjA3NS4xNDUsInN1YiI6IjY3OGEyMjliMmJhOWZiN2M1ZWFkNTljNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w-6ml0nKDan3afmiLD5-giwpZGFw8xOVhXHaRIjeAFQ'
    } // TODO
});

// Add interceptors for handling global errors
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    },
);

export default axiosInstance;