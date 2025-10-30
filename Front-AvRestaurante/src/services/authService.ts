import api from "./api";

export interface LoginRequest {
    email: string;
    senha: string;
  }
  
  export interface LoginResponse {
    token: string;
  }

  const authService = {

  }

  export async function LoginNovo(LoginRequest:LoginRequest):Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("auth/login", LoginRequest);

    return response.data;
  }

  /*const login = async(LoginRequest : LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("auth/login", LoginRequest);

    return response.data;
  }*/


  export default authService;