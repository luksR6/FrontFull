import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Usuario {
    email: string;
    nome: string;
}

type TipoPerfil = 'admin' | 'usuario' | null;

interface AuthState {
    isAutenticado: boolean;
    usuario: Usuario | null;
    token: string | null;
    tipoPerfil: TipoPerfil;
}

interface LoginPayload {
    usuario: Usuario;
    token: string;
    tipoPerfil: TipoPerfil; 
}

const inicialState: AuthState = {
    isAutenticado: false,
    usuario: null,
    token: null,
    tipoPerfil: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: inicialState,
    reducers: {
        loginSucesso: (state, action: PayloadAction<LoginPayload>) => {
                state.isAutenticado = true;
                state.token = action.payload.token;
                state.usuario = action.payload.usuario;
                state.tipoPerfil = action.payload.tipoPerfil;
            },

        logout: (state) => {
                state.isAutenticado = false;
                state.token = null;
                state.usuario = null;
                state.tipoPerfil = null; 
            }
        
    },
});

export const { loginSucesso, logout } = authSlice.actions;
export default authSlice.reducer;