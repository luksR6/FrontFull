import React, { useState, useEffect } from 'react';
import Atualizar from '../../components/atualizar'; 
import Spinner from '../../components/loading'; 
import restauranteService from '../../services/restauranteService';
import type { Restaurante } from '../../types';

function CadastroRestaurante() {

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [nome, setNome] = useState('');
  const [restauranteEmModal, setRestauranteEmModal] = useState<Restaurante | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRestaurantes = async () => {
    setIsLoadingPage(true);
    try {
      const dados = await restauranteService.listarRestaurantes();
      setRestaurantes(dados);
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
    
    try {
      await restauranteService.cadastrarRestaurante(nome);
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
    try {
      await restauranteService.atualizarRestaurante(updatedRestaurante.id, updatedRestaurante.nome);
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
        await restauranteService.deletarRestaurante(idToDelete);
        setRestaurantes(prev => prev.filter(r => r.id !== idToDelete));
      } catch (error) {
        console.error("Erro ao deletar restaurante:", error);
      }
    }
  };

  return (
    <div className="container-fluid p-4">
        <h1>Cadastro do Restaurante</h1>
        <form onSubmit={handleSubmit} className="mb-5">
            <div className="mb-3">
                <label className="form-label">Nome do Restaurante</label>
                <input type="text" className="form-control" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </button>
        </form>
        
        <hr />
        {isLoadingPage ? <Spinner /> : (
            <ul className="list-group">
                {restaurantes.map(r => (
                    <li key={r.id} className="list-group-item d-flex justify-content-between">
                        <h5>{r.nome}</h5>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => setRestauranteEmModal(r)}>
                                <i className="bi bi-pencil-square"></i>
                            </button>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(r.id)}>
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