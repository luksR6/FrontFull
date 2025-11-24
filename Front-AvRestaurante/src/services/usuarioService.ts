import api from "./api";
import type { Usuario } from "../types";

export async function buscarTodosUsuarios(): Promise<Usuario[]> {
    const response = await api.get<Usuario[]>("/usuarios");
    return response.data;
}

const usuarioService = {
    buscarTodosUsuarios
};

export default usuarioService;