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
    "/auth/redefinirSenha",
    "/usuarios" 
];

api.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;

        const ehRotaPublica = rotasPublicas.some(rota => 
            config.url?.includes(rota)
        );

        if (token && !ehRotaPublica) {
            config.headers.Authorization = `Bearer ${token}`;
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
        const urlDaRequisicao = error.config?.url;
        const ehRequisicaoPublica = rotasPublicas.some(rota => 
            urlDaRequisicao?.includes(rota)
        );

        if (error.response && error.response.status === 401) {
            
            if (!ehRequisicaoPublica) {
                console.warn("Sessão expirada. Realizando logout automático.");
                store.dispatch(logout());
                window.location.href = "/login";
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;