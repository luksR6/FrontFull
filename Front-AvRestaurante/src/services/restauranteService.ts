import api from './api';
import type { Restaurante, Avaliacao, NovaAvaliacaoRequest } from '../types';

export async function listarRestaurantesParaAvaliar(termo?: string): Promise<Restaurante[]> {
  let url = '/restaurantes'; 
  if (termo) {
    url += `?nome=${encodeURIComponent(termo)}`;
  }
  const response = await api.get<Restaurante[]>(url);
  return response.data;
}


export async function listarRestaurantesDoAdmin(termo?: string): Promise<Restaurante[]> {
  let url = '/restaurantes/me'; 
  if (termo) {
    url += `?nome=${encodeURIComponent(termo)}`;
  }
  const response = await api.get<Restaurante[]>(url);
  return response.data;
}

export async function cadastrarRestaurante(nome: string): Promise<Restaurante> {
  const response = await api.post<Restaurante>('/restaurantes', { nome });
  return response.data;
}

export async function atualizarRestaurante(id: number, nome: string): Promise<Restaurante> {
  const response = await api.put<Restaurante>(`/restaurantes/${id}`, { nome });
  return response.data;
}

export async function deletarRestaurante(id: number): Promise<void> {
  await api.delete(`/restaurantes/${id}`);
}

export async function listarAvaliacoesPorRestaurante(id: number): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>(`/avaliacao/restaurante/${id}`);
  return response.data;
}

export async function listarTodasAvaliacoes(): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>('/avaliacao');
  return response.data;
}

export async function enviarAvaliacao(dados: NovaAvaliacaoRequest): Promise<Avaliacao> {
  const response = await api.post<Avaliacao>('/avaliacao', dados);
  return response.data;
}

export async function listarMinhasAvaliacoes(): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>("/avaliacao/me");
  return response.data;
}

export async function deletarAvaliacao(id: number): Promise<void> {
  await api.delete(`/avaliacao/${id}`);
}

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
