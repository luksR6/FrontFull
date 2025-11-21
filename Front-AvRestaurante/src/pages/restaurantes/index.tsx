import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import CardRestaurante from '../../components/cards'; 
import api from '../../services/api';
import Comentarios from '../../components/comentarios'; 

import type { Restaurante, Avaliacao } from '../../types'; 

function Restaurantes() {
  const navigate = useNavigate(); 
  
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [restauranteSelecionado, setRestauranteSelecionado] = useState<Restaurante | null>(null);
  const [comments, setComments] = useState<Avaliacao[]>([]);

  const location = useLocation();
  const termoBusca = location.state?.termoBusca || "";

  const fetchRestaurantes = async () => {
    try {
      let url = '/restaurantes';
      if (termoBusca) {
        url += `?nome=${encodeURIComponent(termoBusca)}`;
      }
      const response = await api.get<Restaurante[]>(url);
      setRestaurantes(response.data);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
      setRestaurantes([]);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, [termoBusca]);

  const handleAbrirModal = async (restaurante: Restaurante) => {
    setRestauranteSelecionado(restaurante);
    try {
      const response = await api.get<Avaliacao[]>(`/avaliacao/restaurante/${restaurante.id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      setComments([]);
    }
  };

  const handleFecharModal = () => {
    setRestauranteSelecionado(null);
    setComments([]);
  };

  const handleAddAvaliacao = async (nota: number, comentario: string) => {
    if (!restauranteSelecionado) return;

    const novaAvaliacao = {
      restauranteId: restauranteSelecionado.id,
      nota,
      comentario,
    };

    try {
      const response = await api.post<Avaliacao>('/avaliacao', novaAvaliacao);
      const avaliacaoRetornada = response.data;

      handleFecharModal();

      setRestaurantes((listaAntiga) =>
        listaAntiga.map((restaurante) =>
          restaurante.id === restauranteSelecionado.id &&
          avaliacaoRetornada.mediaNotaDoRestaurante != null
            ? { ...restaurante, mediaNota: avaliacaoRetornada.mediaNotaDoRestaurante }
            : restaurante
        )
      );
    } catch (error) {
      console.error('Erro ao adicionar nova avaliação:', error);
    }
  };

  return (
    <div className="container-fluid p-4">
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Restaurantes</h1>
        {termoBusca && (
          <div className="d-flex align-items-center">
            <span className="badge bg-secondary fs-6 me-2">
              Buscando por: "{termoBusca}"
            </span>
            
            <button 
                className="btn btn-link text-danger text-decoration-none small fw-bold p-0"
                onClick={() => navigate('/restaurantes', { state: {} })}
            >
               Limpar
            </button>
          </div>
        )}
      </div>

      <div className="row">
        {restaurantes.length > 0 ? (
          restaurantes.map((restaurante) => (
            <CardRestaurante
              key={restaurante.id}
              restaurante={restaurante}
              onAvaliarClick={handleAbrirModal}
            />
          ))
        ) : (
          <div className="col-12 text-center mt-5">
            <p className="text-muted fs-4">
              Nenhum restaurante encontrado{termoBusca ? ` para "${termoBusca}"` : ""}.
            </p>
          </div>
        )}
      </div>

      {restauranteSelecionado && (
        <Comentarios
          restaurante={restauranteSelecionado}
          onClose={handleFecharModal}
          onAddComment={handleAddAvaliacao}
          comments={comments}
        />
      )}
    </div>
  );
}

export default Restaurantes;