import axios from "axios";


//create an instance of axios
const axiosinstance = axios.create({
    baseURL:"https://jwtauth.techxdeveloper.com/api/",
    headers:{
        "Content-Type": "application/json",
    },
});

//Add a request interceptor
axiosinstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a response
axiosinstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
             window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export default axiosinstance;