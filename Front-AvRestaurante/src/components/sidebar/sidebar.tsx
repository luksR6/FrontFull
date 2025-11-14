import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store'; // (Confirme o caminho para sua store)

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) {
    return null;
  }

  const { tipoPerfil } = useSelector((state: RootState) => state.auth);

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
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            
            {/* Links que todos podem ver */}
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={onClose}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/restaurantes" className="nav-link" onClick={onClose}>
                Restaurantes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/perfil" className="nav-link" onClick={onClose}>
                Perfil
              </Link>
            </li>

            {/* 2. Link que SÓ o 'admin' pode ver */}
            {tipoPerfil === 'admin' && (
              <li className="nav-item">
                  <Link to="/cadastroRestaurante" className="nav-link" onClick={onClose}>
                    Cadastrar
                  </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;