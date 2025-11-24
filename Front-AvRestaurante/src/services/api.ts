import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/'
})

const rotasPublicas = [
    "auth/login",
    "auth/register", 
    "auth/esqueciMinhaSenha",
    "auth/redefinirSenha" 
];

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            const urlEhPublica = rotasPublicas.some(rota => 
                config.url?.endsWith(rota)
            );
            if (!urlEhPublica) {
                 window.location.href = "/login"; 
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;