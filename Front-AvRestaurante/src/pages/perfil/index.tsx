import { useState, useEffect } from 'react';
import api from '../../services/api';
import CardAvaliacao, { type Avaliacao } from '../../components/cardsAvaliacao';



function Perfil() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarAvaliacoes = async () => {
      try {
        const response = await api.get<Avaliacao[]>('/avaliacao');
        setAvaliacoes(response.data);
      } catch (err) {
        setError('Não foi possível carregar as avaliações. Tente novamente mais tarde.');
        console.error('Erro ao buscar avaliações:', err);
      } finally {
        setLoading(false);
      }
    };
    buscarAvaliacoes();
  }, []);

  if (loading) return <p className="text-center my-5">Carregando...</p>;
  if (error) return <p className="text-center text-danger my-5">{error}</p>;

  const usuarioVisual = {
    name: 'Lucas Rodrigues',
    sub: 'lucas.rodrigues@email.com',
  };

  return (
    <div className="container my-5">
      <div className="border-bottom pb-3 mb-5">
        <div className="d-flex align-items-center">
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="bi bi-person-fill text-secondary"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
          <div>
            <h2 className="fw-bold mb-0">{usuarioVisual.name}</h2>
            <p className="text-muted mb-0">{usuarioVisual.sub}</p>
          </div>
        </div>
      </div>

      <div className="text-center mb-5">
        <h2 className="fw-bold">Minhas Avaliações</h2>
      </div>

      <div className="row">
        {avaliacoes.length > 0 ? (
          avaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="col-md-6 mb-4">
              <CardAvaliacao avaliacao={avaliacao} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Você ainda não fez nenhuma avaliação.</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;