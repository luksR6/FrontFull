import api from './api';
import type { Restaurante, Avaliacao, NovaAvaliacaoRequest } from '../types';

// ==========================
// RESTAURANTES
// ==========================

// Para usuários comuns avaliarem restaurantes
export async function listarRestaurantesParaAvaliar(termo?: string): Promise<Restaurante[]> {
  let url = '/restaurantes'; // rota pública para todos os restaurantes
  if (termo) {
    url += `?nome=${encodeURIComponent(termo)}`;
  }
  const response = await api.get<Restaurante[]>(url);
  return response.data;
}

// Para admin ver apenas os seus restaurantes
export async function listarRestaurantesDoAdmin(termo?: string): Promise<Restaurante[]> {
  let url = '/restaurantes/me'; // rota privada do admin
  if (termo) {
    url += `?nome=${encodeURIComponent(termo)}`;
  }
  const response = await api.get<Restaurante[]>(url);
  return response.data;
}

// Cadastrar restaurante (admin)
export async function cadastrarRestaurante(nome: string): Promise<Restaurante> {
  const response = await api.post<Restaurante>('/restaurantes', { nome });
  return response.data;
}

// Atualizar restaurante (admin)
export async function atualizarRestaurante(id: number, nome: string): Promise<Restaurante> {
  const response = await api.put<Restaurante>(`/restaurantes/${id}`, { nome });
  return response.data;
}

// Deletar restaurante (admin)
export async function deletarRestaurante(id: number): Promise<void> {
  await api.delete(`/restaurantes/${id}`);
}

// ==========================
// AVALIAÇÕES
// ==========================

// Listar avaliações de um restaurante
export async function listarAvaliacoesPorRestaurante(id: number): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>(`/avaliacao/restaurante/${id}`);
  return response.data;
}

// Listar todas avaliações (admin ou geral)
export async function listarTodasAvaliacoes(): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>('/avaliacao');
  return response.data;
}

// Enviar nova avaliação (usuário)
export async function enviarAvaliacao(dados: NovaAvaliacaoRequest): Promise<Avaliacao> {
  const response = await api.post<Avaliacao>('/avaliacao', dados);
  return response.data;
}

// Listar minhas avaliações (usuário)
export async function listarMinhasAvaliacoes(): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>("/avaliacao/me");
  return response.data;
}

// Deletar avaliação (admin ou dono, dependendo do backend)
export async function deletarAvaliacao(id: number): Promise<void> {
  await api.delete(`/avaliacao/${id}`);
}

// ==========================
// EXPORT
// ==========================
const restauranteService = {
  listarRestaurantesParaAvaliar,
  listarRestaurantesDoAdmin,
  cadastrarRestaurante,
  atualizarRestaurante,
  deletarRestaurante,
  listarAvaliacoesPorRestaurante,
  listarTodasAvaliacoes,
  enviarAvaliacao,
  listarMinhasAvaliacoes,
  deletarAvaliacao
};

export default restauranteService;
