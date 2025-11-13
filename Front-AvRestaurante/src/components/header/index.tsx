import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice'; 

interface HeaderProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="bg-dark px-3 py-2">
      <nav className="nav navbar-dark d-flex align-items-center w-100 justify-content-between">
        
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            onClick={onToggleSidebar}
            aria-label="Abrir menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        
        <div className="text-center">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <i 
              className="bi bi-patch-check-fill text-white fs-2 me-3"
            ></i>
            <span className="text-white fs-4 fw-bold">
              Avalioo
            </span>
          </Link>
        </div>
        
        <div className="d-flex align-items-center">
          {token ? (
            <button 
              onClick={() => dispatch(logout())}
              className="nav-link text-white btn btn-link"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-link text-white">
              Login
            </Link>
          )}
        </div>
        
      </nav>
    </header>
  );
}

export default Header;