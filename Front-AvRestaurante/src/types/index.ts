export type TipoPerfil = 'admin' | 'usuario' | null;

export interface Usuario {
  id?: number;
  email: string;
  nome: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginRespostaDto {
  token: string;
  usuario: Usuario;
  tipoPerfil: TipoPerfil;
}

export interface Restaurante {
  id: number;
  nome: string;
  mediaNota: number; 
  imagemUrl?: string; 
  descricao?: string; 
}

export interface Avaliacao {
  id: number;
  nota: number;
  comentario: string;
  nomeRestaurante?: string;
  mediaNotaDoRestaurante?: number;
  usuario?: Usuario; 
}

export interface NovaAvaliacaoRequest {
  restauranteId: number;
  nota: number;
  comentario: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}