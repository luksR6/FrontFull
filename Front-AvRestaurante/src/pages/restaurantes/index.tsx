import { useState, useEffect } from 'react';
import Comentarios from '../comentarios';
import apiClient from '../../services/api'; 
import ImgCards from '../../assets/card.jpg';

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

const PLACEHOLDER_IMAGE_URL = ImgCards; 

function Restaurantes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [selectedAvaliacao, setSelectedAvaliacao] = useState<Avaliacao | null>(null);

  const [comments] = useState<Comment[]>([]);

  const fetchAvaliacoes = async () => {
    try {
      const response = await apiClient.get('/avaliacao');
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
      await apiClient.post('/avaliacao', novaAvaliacao);
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
        {avaliacoes.map((avaliacao) => (
          <div key={avaliacao.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={PLACEHOLDER_IMAGE_URL} className="card-img-top" alt={avaliacao.nomeRestaurante} style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{avaliacao.nomeRestaurante}</h5>
                <p className="card-text text-muted flex-grow-1">{avaliacao.comentario}</p>
                
                <div className="d-flex justify-content-end align-items-center mt-auto gap-3">
                  <span className="badge bg-warning text-dark fs-6 p-2">
                    ★ {avaliacao.nota}
                  </span>
                </div>
                
              </div>
            </div>
          </div>
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