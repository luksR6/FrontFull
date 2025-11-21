import api from "./api";

import type { LoginRequest, LoginRespostaDto, CadastroRequest } from "../types";

export async function LoginNovo(data: LoginRequest): Promise<LoginRespostaDto> {
    const response = await api.post<LoginRespostaDto>("/auth/login", data);
    return response.data;
}

export async function cadastrarUsuario(data: CadastroRequest): Promise<void> {
    await api.post("/auth/register", data);
}

export async function esqueciMinhaSenha(email: string): Promise<void> {
    await api.post("/auth/esqueciMinhaSenha", { email });
}

const authService = {
  LoginNovo,
  cadastrarUsuario,
  esqueciMinhaSenha
};

export default authService;