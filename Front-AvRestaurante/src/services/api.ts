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
             // Se tem token, anexa ele
             config.headers.Authorization = `Bearer ${token}`;
         } else {
             // Se NÃO tem token, verifique se a rota é pública
             const urlEhPublica = rotasPublicas.some(rota => 
                config.url?.endsWith(rota)
            );

             // Se a rota NÃO for pública, redirecione para /login
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