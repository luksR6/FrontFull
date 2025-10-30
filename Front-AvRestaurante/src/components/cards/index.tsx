// src/components/CardRestaurante/index.tsx

import ImgCards from '../../assets/card.jpg';

// Reutilize a interface ou defina-a aqui se não tiver um arquivo de tipos compartilhado
interface Avaliacao {
  id: number;
  nomeRestaurante: string;
  nota: number;
  comentario: string;
}

// Define as propriedades que o componente CardRestaurante espera receber
interface CardRestauranteProps {
  avaliacao: Avaliacao;
}

const PLACEHOLDER_IMAGE_URL = ImgCards;

// O componente recebe 'avaliacao' via desestruturação das props
function CardRestaurante({ avaliacao }: CardRestauranteProps) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img 
          src={PLACEHOLDER_IMAGE_URL} 
          className="card-img-top" 
          alt={avaliacao.nomeRestaurante} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
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
  );
}

export default CardRestaurante;