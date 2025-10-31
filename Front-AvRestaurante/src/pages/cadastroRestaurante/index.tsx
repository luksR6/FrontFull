import React, { useState, useEffect } from 'react';
import Atualizar from '../atualizar';
import Spinner from '../../components/loading';
import api from '../../services/api';

export interface Restaurante {
  id: number;
  nome: string; 
}

function CadastroRestaurante() {

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [nome, setNome] = useState('');
  
  const [restauranteEmModal, setRestauranteEmModal] = useState<Restaurante | null>(null);

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRestaurantes = async () => {
    setIsLoadingPage(true);
    try {
      const response = await api.get('/restaurantes');
      setRestaurantes(response.data);
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const novoRestaurante = { 
      nome: nome 
    };

    try {
      await api.post('/restaurantes', novoRestaurante);
      await fetchRestaurantes();
      setNome('');
    } catch (error) {
      console.error("Erro ao adicionar restaurante:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRestaurant = async (updatedRestaurante: Restaurante) => {
    setIsSubmitting(true);
    const { id, ...dataToUpdate } = updatedRestaurante;
    try {
      await api.put(`/restaurantes/${id}`, dataToUpdate);
      await fetchRestaurantes();
      setRestauranteEmModal(null);
    } catch (error) {
      console.error("Erro ao atualizar restaurante:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (idToDelete: number) => {
    if (window.confirm("Tem certeza que deseja excluir este restaurante?")) {
      try {
        await api.delete(`/restaurantes/${idToDelete}`);
        setRestaurantes(prev => prev.filter(r => r.id !== idToDelete));
      } catch (error) {
        console.error("Erro ao deletar restaurante:", error);
      }
    }
  };

  return (
    <div className="container-fluid">
      <h1>Cadastro do Restaurante</h1>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label className="form-label">Nome do Restaurante</label>
          <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status" className="ms-2">Adicionando...</span>
            </>
          ) : (
            'Adicionar'
          )}
        </button>
      </form>

      <hr />

      <h2>Itens Cadastrados</h2>
      {isLoadingPage ? (
        <Spinner />
      ) : (
        <ul className="list-group">
          {restaurantes.map((restaurante) => (
            <li key={restaurante.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{restaurante.nome}</h5>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setRestauranteEmModal(restaurante)}>
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(restaurante.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {restauranteEmModal && (
        <Atualizar 
          restaurante={restauranteEmModal} 
          onSave={handleUpdateRestaurant} 
          onClose={() => setRestauranteEmModal(null)} 
          isSubmitting={isSubmitting}
        />
      )}
      
    </div>
  );
}

export default CadastroRestaurante;
