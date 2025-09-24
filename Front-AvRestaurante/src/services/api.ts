import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- INTERCEPTOR DE REQUISIÇÃO ---
// Este código vai ser executado ANTES de CADA requisição que o axios fizer.
apiClient.interceptors.request.use(
  (config) => {
    // 1. Pega o token que salvamos no localStorage durante o login
    const token = localStorage.getItem('authToken');
    
    // 2. Se o token existir, ele é adicionado ao cabeçalho 'Authorization'
    if (token) {
      // O formato "Bearer <token>" é um padrão universal para enviar tokens JWT
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. Retorna a configuração da requisição com o cabeçalho adicionado
    return config;
  },
  (error) => {
    // Se der algum erro na configuração, a requisição é rejeitada
    return Promise.reject(error);
  }
);

export default apiClient;