import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { redefinirSenha } from "../../services/authService";

function RedefinirSenha() {
  const navigator = useNavigate();
  const location = useLocation(); 

  const email = location.state?.email; 

  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!email) {
      setError("Sessão inválida. Por favor, solicite a recuperação novamente.");
      return;
    }

    try {
      await redefinirSenha({
        email: email,
        token: token,
        senha: novaSenha
      });
      
      setMessage("Senha redefinida com sucesso! Você será redirecionado para o login.");

      setToken('');
      setNovaSenha('');
      setConfirmarSenha('');

      setTimeout(() => {
        navigator("/login");
      }, 2000);

    } catch (err: any) {
      console.error("Erro ao redefinir senha:", err);
      if (err.response && err.response.data) {
        const errorMessage = typeof err.response.data === 'string' 
          ? err.response.data
          : "Token inválido ou expirado.";
        setError(errorMessage);
      } else {
        setError("Ocorreu um erro. Tente novamente.");
      }
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
         style={{ background: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)' }}>
      
      <div className="col-11 col-md-10 col-lg-9 col-xl-8">
        <div className="row align-items-center shadow-lg" style={{ backgroundColor: 'white', borderRadius: '1rem' }}>
          
          <div className="col-md-6 text-center text-md-start p-5 d-none d-md-block">
            <h1 className="display-4 fw-bold">
              <i className="bi bi-patch-check-fill me-3"></i>
              Avalioo
            </h1>
            <p className="lead text-muted">
              Junte-se à nossa comunidade e compartilhe suas experiências gastronômicas.
            </p>
          </div>

          <div className="col-md-6 border-start">
            <div className="p-5">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-3">Redefinir Senha</h3>
                <p className="text-center text-muted mb-4">
                  Enviamos um token para {email || "seu e-mail"}. Insira-o abaixo.
                </p>

                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <div className="mb-3">
                  <label htmlFor="token" className="form-label">Token de Recuperação</label>
                  <input 
                    type="text" 
                    id="token"   
                    className="form-control" 
                    placeholder="Cole o token do seu e-mail" 
                    value={token} 
                    onChange={(e) => setToken(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                  <input 
                    type="password" 
                    id="novaSenha"   
                    className="form-control" 
                    placeholder="Digite sua nova senha" 
                    value={novaSenha} 
                    onChange={(e) => setNovaSenha(e.target.value)} 
                    required 
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmarSenha" className="form-label">Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    id="confirmarSenha"   
                    className="form-control" 
                    placeholder="Confirme sua nova senha" 
                    value={confirmarSenha} 
                    onChange={(e) => setConfirmarSenha(e.target.value)} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Redefinir Senha
                </button>

                <div className="text-center">
                   <Link to="/login">Voltar para o Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RedefinirSenha;