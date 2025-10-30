import { useState, useEffect } from 'react';
import axios from 'axios';
import CardRestaurante from '../../components/cards'; 


interface Avaliacao {
  id: number;
  nomeRestaurante: string;
  nota: number;
  comentario: string;
}

function Perfil() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const URL_DA_API = 'http://localhost:8080/avaliacao'; 

    const buscarAvaliacoes = async () => {
      try {
        const response = await axios.get<Avaliacao[]>(URL_DA_API);
        setAvaliacoes(response.data); 
      } catch (err) {
        setError('Não foi possível carregar as avaliações. Tente novamente mais tarde.');
        console.error("Erro ao buscar avaliações:", err);
      } finally {
        setLoading(false);
      }
    };

    buscarAvaliacoes();
  }, []);

  if (loading) {
    return <p className="text-center my-5">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-danger my-5">{error}</p>;
  }


  const usuarioVisual = {
    name: 'Lucas Rodrigues',
    sub: 'lucas.rodrigues@email.com',
  };

  return (
    <div className="container my-5">
      
      <div className="border-bottom pb-3 mb-5">
        <div className="d-flex align-items-center">
          
          <i className="bi bi-person-circle display-4 me-3 text-secondary"></i>
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
          avaliacoes.map(avaliacao => (
            <CardRestaurante key={avaliacao.id} avaliacao={avaliacao} />
          ))
        ) : (
          <p className="text-center text-muted">Você ainda não fez nenhuma avaliação.</p>
        )}
      </div>
    </div>
  );
}

export default Perfil;