import type { Avaliacao } from '../../types';

interface CardAvaliacaoProps {
  avaliacao: Avaliacao;
}

function CardAvaliacao({ avaliacao }: CardAvaliacaoProps) {
  return (
    <div className="card h-100 shadow-sm rounded-lg border-0 bg-light">
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold mb-2 text-primary">
          {avaliacao.nomeRestaurante || "Restaurante"}
        </h6>
        
        <div className="mb-2">
           <span className="badge bg-warning text-dark">
              {avaliacao.nota} <i className="bi bi-star-fill"></i>
           </span>
        </div>

        <p className="card-text fst-italic text-muted flex-grow-1 small">
          "{avaliacao.comentario}"
        </p>
      </div>
    </div>
  );
}

export default CardAvaliacao;