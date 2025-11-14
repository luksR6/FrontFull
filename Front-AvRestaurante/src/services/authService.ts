import api from "./api";

export interface LoginRequest {
    email: string;
    senha: string;
}

interface UsuarioResponse {
  nome: string;
  email: string;
}


export interface LoginRespostaCompleta {
    token: string;
    usuario: UsuarioResponse;
    tipoPerfil: 'admin' | 'usuario' | null; 
}

const authService = {
  LoginNovo
};

export async function LoginNovo(LoginRequest: LoginRequest): Promise<LoginRespostaCompleta> {
    
    const response = await api.post<LoginRespostaCompleta>("auth/login", LoginRequest);

    return response.data;
}

/*const login = async(LoginRequest : LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("auth/login", LoginRequest);

    return response.data;
  }*/

export default authService;


  