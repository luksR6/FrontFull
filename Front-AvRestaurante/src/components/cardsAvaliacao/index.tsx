
export interface Avaliacao {
  id: number;
  nomeRestaurante: string;
  nota: number;
  comentario: string;
}

interface CardAvaliacaoProps {
  avaliacao: Avaliacao;
}

function CardAvaliacao({ avaliacao }: CardAvaliacaoProps) {
  return (
    <div className="card h-100 shadow-sm rounded-lg">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{avaliacao.nomeRestaurante}</h5>
        <p className="card-text mb-2">
          <strong>Nota: {avaliacao.nota} ⭐</strong>
        </p>
        <p className="card-text fst-italic text-muted flex-grow-1">
          "{avaliacao.comentario}"
        </p>
      </div>
    </div>
  );
}

export default CardAvaliacao;