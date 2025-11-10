import { useState, useEffect } from 'react';
import CardRestaurante from '../../components/cards';
import api from '../../services/api';
import Comentarios from '../comentarios';

interface Restaurante {
  id: number;
  nome: string;
  mediaNota: number;
  imagemUrl?: string;
}

interface Comment {
  id: number;
  nota: number;
  comentario: string;
  mediaNotaDoRestaurante?: number;
}

function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [restauranteSelecionado, setRestauranteSelecionado] = useState<Restaurante | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchRestaurantes = async () => {
    try {
      const response = await api.get<Restaurante[]>('restaurantes');
      setRestaurantes(response.data);
    } catch (error) {
      console.error('Erro ao buscar restaurantes da API:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const handleAbrirModal = async (restaurante: Restaurante) => {
    setRestauranteSelecionado(restaurante);
    try {
      const response = await api.get<Comment[]>(`/avaliacao/restaurante/${restaurante.id}`);
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
      const response = await api.post<Comment>('/avaliacao', novaAvaliacao);
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
    <div className="container-fluid">
      <h1 className="mb-4">Restaurantes</h1>
      <div className="row">
        {restaurantes.map((restaurante) => (
          <CardRestaurante
            key={restaurante.id}
            restaurante={restaurante}
            onAvaliarClick={handleAbrirModal}
          />
        ))}
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
