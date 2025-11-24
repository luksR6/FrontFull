import { useState, useEffect } from 'react';
import restauranteService from '../../services/restauranteService'; 
import CardAvaliacao from '../../components/cardsAvaliacao'; 
import type { Avaliacao } from '../../types';

function Perfil() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscarAvaliacoes = async () => {
      try {
        const dados = await restauranteService.listarMinhasAvaliacoes();
        setAvaliacoes(dados);
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
            <i className="bi bi-person-fill text-secondary fs-2"></i>
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
          <div className="col-12 text-center">
            <p className="text-muted">Você ainda não fez nenhuma avaliação.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;