import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [busca, setBusca] = useState("");

  const { tipoPerfil } = useSelector((state: RootState) => state.auth);
  const recentes = useSelector((state: RootState) => state.recentes?.items || []);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busca.trim()) {
      navigate('/restaurantes', { state: { termoBusca: busca } });
      setBusca(""); 
      onClose();   
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div 
        className="offcanvas-backdrop fade show" 
        onClick={onClose}
        style={{ backdropFilter: 'blur(3px)' }}
      ></div>
      
      <div
        className="offcanvas offcanvas-start show text-white"
        style={{ 
            visibility: "visible", 
            background: 'linear-gradient(180deg, #212529 0%, #343a40 100%)',
            boxShadow: '4px 0 15px rgba(0,0,0,0.5)'
        }}
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header border-bottom border-secondary pb-3">
          <div className="d-flex align-items-center">
             <i className="bi bi-patch-check-fill text-primary fs-3 me-2"></i>
             <h5 className="offcanvas-title fw-bold">Menu Avalioo</h5>
          </div>
          <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
        </div>
        
        <div className="offcanvas-body d-flex flex-column px-3 pt-4">
          
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary rounded-start-pill ps-3" 
                placeholder="Buscar restaurante..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{ boxShadow: 'none' }}
              />
              <button 
                className="btn btn-outline-secondary border-start-0 rounded-end-pill" 
                type="button" 
                onClick={handleSearch}
              >
                <i className="bi bi-search text-white"></i>
              </button>
            </div>
          </form>

          <ul className="navbar-nav flex-grow-0 mb-4 gap-2">
            <li className="nav-item">
                <Link 
                    to="/" 
                    className={`nav-link px-3 rounded-3 d-flex align-items-center ${isActive('/') ? 'bg-primary text-white shadow-sm' : 'text-white-50 hover-light'}`}
                    onClick={onClose}
                >
                    <i className="bi bi-house-door-fill me-3 fs-5"></i>
                    Home
                </Link>
            </li>
            
            <li className="nav-item">
                <Link 
                    to="/restaurantes" 
                    className={`nav-link px-3 rounded-3 d-flex align-items-center ${isActive('/restaurantes') ? 'bg-primary text-white shadow-sm' : 'text-white-50 hover-light'}`}
                    onClick={onClose}
                >
                    <i className="bi bi-shop me-3 fs-5"></i>
                    Restaurantes
                </Link>
            </li>
            
            {tipoPerfil !== 'admin' && (
              <li className="nav-item">
                  <Link 
                    to="/perfil" 
                    className={`nav-link px-3 rounded-3 d-flex align-items-center ${isActive('/perfil') ? 'bg-primary text-white shadow-sm' : 'text-white-50 hover-light'}`}
                    onClick={onClose}
                  >
                    <i className="bi bi-person-circle me-3 fs-5"></i>
                    Meu Perfil
                  </Link>
              </li>
            )}
            
            {tipoPerfil === 'admin' && (
              <li className="nav-item">
                  <Link 
                    to="/cadastroRestaurante" 
                    className={`nav-link px-3 rounded-3 d-flex align-items-center ${isActive('/cadastroRestaurante') ? 'bg-primary text-white shadow-sm' : 'text-white-50 hover-light'}`}
                    onClick={onClose}
                  >
                    <i className="bi bi-plus-circle-fill me-3 fs-5"></i>
                    Cadastrar Novo
                  </Link>
              </li>
            )}
          </ul>

          {recentes.length > 0 && (
            <div className="mt-auto border-top border-secondary pt-3">
              <h6 className="text-uppercase text-white-50 fw-bold small mb-3 ls-1">
                <i className="bi bi-clock-history me-2"></i>
                Vistos Recentemente
              </h6>
              <ul className="list-unstyled">
                {recentes.map((item) => (
                  <li key={item.id} className="mb-2">
                    <Link 
                      to={`/restaurantes`} 
                      className="d-flex align-items-center text-decoration-none text-white p-2 rounded-3 bg-white bg-opacity-10 hover-bg-opacity-20 transition-all"
                      onClick={onClose}
                    >
                      <div 
                        className="me-3 rounded bg-dark flex-shrink-0" 
                        style={{ width: '40px', height: '40px', overflow: 'hidden' }}
                      >
                        {item.imagemUrl ? (
                          <img 
                            src={item.imagemUrl} 
                            alt={item.nome} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.classList.add('d-flex', 'align-items-center', 'justify-content-center');
                                e.currentTarget.parentElement!.innerHTML = '<i class="bi bi-shop text-white-50"></i>';
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <i className="bi bi-shop text-white-50"></i>
                          </div>
                        )}
                      </div>
                      
                      <div className="overflow-hidden">
                        <div className="fw-bold text-truncate small">{item.nome}</div>
                        <span className="text-white-50" style={{ fontSize: '0.75rem' }}>Visualizar novamente</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Sidebar;