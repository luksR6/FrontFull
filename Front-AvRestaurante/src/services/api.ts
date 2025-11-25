import axios from "axios";
import { store } from "../redux/store";
import { logout } from "../redux/authSlice";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/'
});

const rotasPublicas = [
    "/auth/login",
    "/auth/register", 
    "/auth/esqueciMinhaSenha",
    "/auth/redefinirSenha" 
];

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            const urlEPublica = rotasPublicas.some(rota => 
                config.url?.includes(rota)
            );  
            if (!urlEPublica) {
                 window.location.href = "/login"; 
            }      
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Token expirado ou inválido. Realizando logout automático.");
            
            store.dispatch(logout());

            window.location.href = "/login";
        }
        
        return Promise.reject(error);
    }
);

export default api;