import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Atualizar from '../atualizar'; 

interface Avaliacao {
  id: number;
  nomeRestaurante: string; 
  nota: number;
  comentario: string;
}

function CadastroRestaurante() {
  const API_URL = "http://localhost:8080"; 

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [nome, setNome] = useState('');
  const [nota, setNota] = useState(0); 
  const [comentario, setComentario] = useState('');
  const [avaliacaoEmModal, setAvaliacaoEmModal] = useState<Avaliacao | null>(null);

  const fetchAvaliacoes = async () => {
    try {
      const response = await axios.get(API_URL + '/avaliacao');
      setAvaliacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const novaAvaliacao = { 
      nomeRestaurante: nome, 
      nota, 
      comentario 
    };
    try {
      await axios.post(API_URL + '/avaliacao', novaAvaliacao);
      fetchAvaliacoes(); 
      setNome('');
      setNota(0);
      setComentario('');
    } catch (error) {
      console.error("Erro ao adicionar avaliação:", error);
    }
  };

  const handleUpdateRestaurant = async (updatedAvaliacao: Avaliacao) => {
    const { id, ...dataToUpdate } = updatedAvaliacao;
    try {
      await axios.put(`${API_URL}/avaliacao/${id}`, dataToUpdate);
      fetchAvaliacoes(); 
      setAvaliacaoEmModal(null);
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
    }
  };

  const handleDelete = async (idToDelete: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta avaliação?")) {
      try {
        await axios.delete(`${API_URL}/avaliacao/${idToDelete}`);
        fetchAvaliacoes(); 
      } catch (error) {
        console.error("Erro ao deletar avaliação:", error);
      }
    }
  };

  return (
    <div className="container-fluid">
      <h1>Cadastro de Avaliações</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Nome do Restaurante</label>
          <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Nota (1 a 5)</label>
          <input type="number" className="form-control" value={nota === 0 ? '' : nota} onChange={(e) => setNota(parseInt(e.target.value) || 0)} min="1" max="5" required />
        </div>
        <div className="mb-3">
            <label className="form-label">Comentário</label>
            <textarea className="form-control" value={comentario} onChange={(e) => setComentario(e.target.value)} rows={3}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>

      <hr />

      <h2>Itens Cadastrados</h2>
      <ul className="list-group">
        {avaliacoes.map((avaliacao) => (
          <li key={avaliacao.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{avaliacao.nomeRestaurante}</h5>
              <p className="mb-1">{avaliacao.comentario}</p>
              <small className="text-warning">Nota: {avaliacao.nota} de 5</small>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => setAvaliacaoEmModal(avaliacao)}>
                  <i className="bi bi-pencil-square"></i>
              </button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(avaliacao.id)}>
                  <i className="bi bi-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Atualizar
        restaurantToEdit={avaliacaoEmModal}
        onClose={() => setAvaliacaoEmModal(null)}
        onUpdate={handleUpdateRestaurant}
      />
    </div>
  );
}

export default CadastroRestaurante;