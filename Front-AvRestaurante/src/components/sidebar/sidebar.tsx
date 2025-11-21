import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const { tipoPerfil } = useSelector((state: RootState) => state.auth);
  // Certifique-se de que 'recentes' está no seu store
  const recentes = useSelector((state: RootState) => state.recentes?.items || []);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busca.trim()) {
      // MUDANÇA: Navega para a página de restaurantes enviando o termo no 'state'
      navigate('/restaurantes', { state: { termoBusca: busca } });
      
      setBusca(""); // Limpa o campo
      onClose();    // Fecha a sidebar
    }
  };

  return (
    <>
      <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
      <div
        className="offcanvas offcanvas-start show text-bg-dark"
        style={{ visibility: "visible" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
        </div>
        
        <div className="offcanvas-body d-flex flex-column">
          
          {/* --- 1. CAMPO DE BUSCA --- */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar restaurante..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
              <button className="btn btn-outline-light" type="button" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* --- LINKS DE NAVEGAÇÃO --- */}
          <ul className="navbar-nav justify-content-end flex-grow-0 pe-3">
            <li className="nav-item"><Link to="/" className="nav-link" onClick={onClose}>Home</Link></li>
            <li className="nav-item"><Link to="/restaurantes" className="nav-link" onClick={onClose}>Restaurantes</Link></li>
            <li className="nav-item"><Link to="/perfil" className="nav-link" onClick={onClose}>Perfil</Link></li>
            
            {tipoPerfil === 'admin' && (
              <li className="nav-item">
                  <Link to="/cadastroRestaurante" className="nav-link text-warning" onClick={onClose}>
                    Cadastrar
                  </Link>
              </li>
            )}
          </ul>

          {/* --- 2. SEÇÃO VISTOS POR ÚLTIMO --- */}
          {recentes.length > 0 && (
            <div className="mt-auto border-top pt-3">
              <h6 className="text-white-50 mb-3">Vistos Recentemente</h6>
              <ul className="list-unstyled">
                {recentes.map((item) => (
                  <li key={item.id} className="mb-2">
                    {/* Ao clicar, vai para o restaurante e fecha a sidebar */}
                    <Link 
                      to={`/restaurantes`} // (Idealmente seria /restaurantes/{id}) 
                      className="d-flex align-items-center text-decoration-none text-white"
                      onClick={onClose}
                    >
                      {/* Imagem pequena (thumbnail) */}
                      <div 
                        className="me-2 rounded bg-secondary" 
                        style={{ width: '40px', height: '40px', overflow: 'hidden', flexShrink: 0 }}
                      >
                        {item.imagemUrl ? (
                          <img 
                            src={item.imagemUrl} 
                            alt={item.nome} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                             // Fallback simples se a imagem quebrar
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement?.classList.add('d-flex', 'align-items-center', 'justify-content-center');
                                e.currentTarget.parentElement!.innerHTML = '<i class="bi bi-shop"></i>';
                            }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <i className="bi bi-shop"></i>
                          </div>
                        )}
                      </div>
                      
                      <div className="small overflow-hidden">
                        <div className="fw-bold text-truncate">{item.nome}</div>
                        <span className="text-white-50" style={{ fontSize: '0.8rem' }}>Ver detalhes</span>
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