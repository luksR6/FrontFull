import ImgCards from '../../assets/card.jpg';
import { useDispatch } from 'react-redux';
import { adicionarVistoRecentemente } from '../../redux/recenteSlice'; 
import type { Restaurante } from '../../types';

interface CardRestauranteProps {
  restaurante: Restaurante; 
  onAvaliarClick: (restaurante: Restaurante) => void; 
}

const PLACEHOLDER_IMAGE_URL = ImgCards;

function CardRestaurante({ restaurante, onAvaliarClick }: CardRestauranteProps) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(adicionarVistoRecentemente({
      id: restaurante.id,
      nome: restaurante.nome,
      imagemUrl: restaurante.imagemUrl || PLACEHOLDER_IMAGE_URL 
    }));

    onAvaliarClick(restaurante);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={restaurante.imagemUrl || PLACEHOLDER_IMAGE_URL}
          className="card-img-top"
          alt={restaurante.nome}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE_URL; }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{restaurante.nome}</h5>
          
          <div className="d-flex justify-content-between align-items-center mt-auto gap-3">
            
            <span className="badge bg-warning text-dark p-2 fs-6">
              ★ {(restaurante.mediaNota ?? 0).toFixed(1)}
            </span>

            <button 
              className="btn btn-primary btn-sm"
              onClick={handleClick}
            >
              Avaliar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardRestaurante;