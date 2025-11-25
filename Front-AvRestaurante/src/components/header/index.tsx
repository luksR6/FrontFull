import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice'; 

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    // VOLTAMOS PARA 'sticky-top': Ele fica fixo ao rolar, mas ocupa espaço físico na tela
    <header className="sticky-top shadow" style={{ zIndex: 1030 }}>
      <nav 
        className="navbar navbar-dark px-3 py-3"
        style={{ 
            background: 'linear-gradient(90deg, #1a1e21 0%, #2c3034 100%)', 
            minHeight: '80px'
        }}
      >
        <div className="container-fluid position-relative d-flex align-items-center justify-content-between">

          <div className="d-flex align-items-center">
            <button
              className="btn btn-link text-white p-1 border-0 text-decoration-none"
              type="button"
              onClick={onToggleSidebar}
              aria-label="Abrir menu"
              style={{ transition: 'transform 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <i className="bi bi-list fs-2"></i>
            </button>
          </div>

          <div className="position-absolute start-50 translate-middle-x">
            <Link to="/" className="d-flex align-items-center text-decoration-none group-hover">
              <i className="bi bi-patch-check-fill text-primary fs-3 me-2"></i>
              <span className="text-white fs-4 fw-bold" style={{ letterSpacing: '0.5px' }}>
                Avalioo
              </span>
            </Link>
          </div>

          <div className="d-flex align-items-center">
            {token ? (
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm d-flex align-items-center rounded-pill px-3 py-2 border-0 bg-white bg-opacity-10"
                title="Sair do sistema"
              >
                <span className="me-2 d-none d-sm-inline fw-bold small">Sair</span>
                <i className="bi bi-box-arrow-right fs-6"></i>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary btn-sm d-flex align-items-center rounded-pill px-4 fw-bold shadow-sm"
              >
                <i className="bi bi-person-circle me-2"></i>
                Entrar
              </Link>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;