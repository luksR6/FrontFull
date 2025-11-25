import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSucesso } from "../../redux/authSlice";
import { LoginNovo } from "../../services/authService";
import type { LoginRequest } from "../../types";

const Login = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); 
    setIsLoading(true);

    try {
      const loginResponse = await LoginNovo(formData);

      if (loginResponse && loginResponse.token) {
        console.log("Login bem-sucedido");

        dispatch(loginSucesso({
          usuario: loginResponse.usuario,
          token: loginResponse.token,
          tipoPerfil: loginResponse.tipoPerfil
        }));
        
        navigator("/"); 
      } else {
        setError("Resposta de login inválida.");
      }
      
    } catch (err: any) {
      console.error("O login falhou:", err);
      if (err.response && err.response.status === 401) {
        setError("Email ou senha inválidos.");
      } else {
        setError("Ocorreu um erro. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
         style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      
      <div className="col-11 col-md-10 col-lg-9 col-xl-8">
        <div className="row align-items-stretch shadow-lg" style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden' }}>
          
          {/* Lado Esquerdo - Marca (Padrão Visual) */}
          <div className="col-md-6 text-center text-md-start p-5 d-none d-md-flex flex-column justify-content-center bg-primary bg-opacity-10">
            <h1 className="display-5 fw-bold text-primary">
              <i className="bi bi-patch-check-fill me-3"></i>
              Avalioo
            </h1>
            <p className="lead text-muted mt-3">
              Encontre, avalie e descubra os melhores restaurantes da sua cidade.
            </p>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="col-md-6">
            <div className="p-5 h-100 d-flex flex-column justify-content-center">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Bem-vindo de volta!</h3>
                <p className="text-muted small">Acesse sua conta para continuar</p>
              </div>
              
              {error && (
                <div className="alert alert-danger rounded-3 shadow-sm text-center small animate__animated animate__shakeX">
                   {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                
                {/* Floating Label - Email */}
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="floatingEmail"
                    name="email" 
                    placeholder="nome@exemplo.com"
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingEmail">Email</label>
                </div>

                {/* Floating Label - Senha */}
                <div className="form-floating mb-2">
                  <input 
                    type="password" 
                    className="form-control rounded-3" 
                    id="floatingSenha"
                    name="senha" 
                    placeholder="Senha" 
                    value={formData.senha} 
                    onChange={handleChange} 
                    required 
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingSenha">Senha</label>
                </div>

                <div className="text-end mb-4">
                   <Link to="/esqueceuSenha" className="text-decoration-none small text-muted hover-primary">
                     Esqueceu a senha?
                   </Link>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </button>
                
                <p className="text-center mt-4 mb-0 text-muted">
                   Ainda não tem conta? <Link to="/cadastre-se" className="fw-bold text-decoration-none">Cadastre-se</Link>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;