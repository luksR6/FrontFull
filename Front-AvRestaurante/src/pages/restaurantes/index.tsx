import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardRestaurante from '../../components/cards';
import Comentarios from '../../components/comentarios';
import restauranteService from '../../services/restauranteService';
import type { Restaurante, Avaliacao } from '../../types';
import type { RootState } from '../../redux/store';

function Restaurantes() {
  const navigate = useNavigate();

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [restauranteSelecionado, setRestauranteSelecionado] = useState<Restaurante | null>(null);
  const [comments, setComments] = useState<Avaliacao[]>([]);

  const location = useLocation();
  const termoBusca = location.state?.termoBusca || "";

  const tipoUsuario = useSelector((state: RootState) => state.auth.tipoPerfil);
  const isAdmin = tipoUsuario === 'admin';

  const fetchRestaurantes = async () => {
    try {
      let dados: Restaurante[] = [];

      if (isAdmin) {
        dados = await restauranteService.listarRestaurantesDoAdmin(termoBusca);
      } else {
        dados = await restauranteService.listarRestaurantesParaAvaliar(termoBusca);
      }

      setRestaurantes(dados);
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
      setRestaurantes([]);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, [termoBusca, tipoUsuario]);

  const handleAbrirModal = async (restaurante: Restaurante) => {
    setRestauranteSelecionado(restaurante);
    try {
      const dados = await restauranteService.listarAvaliacoesPorRestaurante(restaurante.id);
      setComments(dados);
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
    if (!restauranteSelecionado || isAdmin) return;

    const novaAvaliacao = {
      restauranteId: restauranteSelecionado.id,
      nota,
      comentario,
    };

    try {
      const avaliacaoRetornada = await restauranteService.enviarAvaliacao(novaAvaliacao);

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
              labelBotao={isAdmin ? "Ver Comentários" : "Avaliar"}
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
          readOnly={isAdmin}
          onRefresh={fetchRestaurantes}
        />
      )}
    </div>
  );
}

export default Restaurantes;