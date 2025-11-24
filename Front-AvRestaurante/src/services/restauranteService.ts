import api from './api';
import type { Restaurante, Avaliacao, NovaAvaliacaoRequest } from '../types';

export async function listarRestaurantes(termo?: string): Promise<Restaurante[]> {
  let url = '/restaurantes';
  if (termo) {
    url += `?nome=${encodeURIComponent(termo)}`;
  }
  
  const response = await api.get<Restaurante[]>(url);
  return response.data;
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

export async function deletarAvaliacao(id: number): Promise<void> {
  await api.delete(`/avaliacao/${id}`);
}

export async function listarMinhasAvaliacoes(): Promise<Avaliacao[]> {
  const response = await api.get<Avaliacao[]>("/avaliacao/me");
  return response.data;
}

const restauranteService = {
  listarRestaurantes,
  listarAvaliacoesPorRestaurante,
  listarTodasAvaliacoes,
  enviarAvaliacao,
  cadastrarRestaurante,
  atualizarRestaurante,
  deletarRestaurante,
  deletarAvaliacao,
  listarMinhasAvaliacoes
};

export default restauranteService;