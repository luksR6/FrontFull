// src/pages/Restaurantes/index.tsx

import { useState, useEffect } from 'react';
import Comentarios from '../comentarios';
import CardRestaurante from '../../components/cards'; // 1. Importe o novo componente
import api from '../../services/api';

// Interfaces (podem ser movidas para um arquivo de tipos compartilhado)
interface Avaliacao {
  id: number;
  nomeRestaurante: string;
  nota: number;
  comentario: string;
}

interface Comment {
  id: number;
  restaurantId: number;
  autor: string;
  texto: string;
}

function Restaurantes() {

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<Avaliacao | null>(null);
  const [comments] = useState<Comment[]>([]);

  const fetchAvaliacoes = async () => {
    try {
      const response = await api.get<Avaliacao[]>('avaliacao');
      // aki da o dist


      setAvaliacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar avaliações da API:", error);
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  const handleAddComment = async (_restaurantId: number, commentText: string) => {
    if (!selectedAvaliacao) return;

    const novaAvaliacao = {
      nomeRestaurante: selectedAvaliacao.nomeRestaurante,
      nota: selectedAvaliacao.nota,
      comentario: commentText
    };

    try {
      await api.post('/avaliacao', novaAvaliacao);
      fetchAvaliacoes();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao adicionar nova avaliação:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedAvaliacao(null);
  };

  return (
    <div className="container-fluid">
      <h1 className="mb-4">Restaurantes</h1>
      <div className="row">
        {/* 2. Use o componente CardRestaurante aqui */}
        {avaliacoes.map((avaliacao) => (
          <CardRestaurante key={avaliacao.id} avaliacao={avaliacao} />
        ))}
      </div>

      <Comentarios
        restaurant={selectedAvaliacao}
        comments={comments}
        onClose={handleCloseModal}
        onAddComment={handleAddComment}
      />
    </div>
  );
}

export default Restaurantes;