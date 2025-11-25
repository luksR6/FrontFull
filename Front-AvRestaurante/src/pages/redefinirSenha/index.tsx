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
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true); // Trava o botão

    if (novaSenha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    if (!email) {
      setError("Sessão inválida. Por favor, solicite a recuperação novamente.");
      setIsLoading(false);
      return;
    }

    try {
      await redefinirSenha({
        email: email,
        token: token,
        senha: novaSenha
      });

      setMessage("Senha redefinida com sucesso! Redirecionando...");

      setToken('');
      setNovaSenha('');
      setConfirmarSenha('');

      // Delay para leitura da mensagem de sucesso antes de ir pro login
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
      setIsLoading(false); // Destrava apenas se der erro (no sucesso, espera o redirect)
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
         style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>

      <div className="col-11 col-md-10 col-lg-9 col-xl-8">
        <div className="row align-items-stretch shadow-lg" style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden' }}>

          {/* Lado Esquerdo - Marca */}
          <div className="col-md-6 text-center text-md-start p-5 d-none d-md-flex flex-column justify-content-center bg-primary bg-opacity-10">
            <h1 className="display-5 fw-bold text-primary">
              <i className="bi bi-patch-check-fill me-3"></i>
              Avalioo
            </h1>
            <p className="lead text-muted mt-3">
              Defina uma nova senha segura para voltar a acessar sua conta e suas avaliações.
            </p>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="col-md-6">
            <div className="p-5 h-100 d-flex flex-column justify-content-center">
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-primary">
                    <i className="bi bi-shield-lock-fill fs-3"></i>
                </div>
                <h3 className="fw-bold">Redefinir Senha</h3>
                <p className="text-muted small">
                  {email ? `Para o usuário: ${email}` : "Insira o token recebido e sua nova senha."}
                </p>
              </div>

              {error && (
                <div className="alert alert-danger rounded-3 shadow-sm text-center small animate__animated animate__shakeX">
                   {error}
                </div>
              )}

              {message && (
                <div className="alert alert-success rounded-3 shadow-sm text-center small animate__animated animate__fadeIn">
                   {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Floating Label - Token */}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="token"
                    placeholder="Token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    disabled={isLoading || !!message}
                  />
                  <label htmlFor="token">Token de Recuperação</label>
                </div>

                {/* Floating Label - Nova Senha */}
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="novaSenha"
                    placeholder="Nova Senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                    disabled={isLoading || !!message}
                  />
                  <label htmlFor="novaSenha">Nova Senha</label>
                </div>

                {/* Floating Label - Confirmar Senha */}
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="confirmarSenha"
                    placeholder="Confirmar Senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    required
                    disabled={isLoading || !!message}
                  />
                  <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm mb-4"
                  disabled={isLoading || !!message}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Redefinindo...
                    </>
                  ) : (
                    "Salvar Nova Senha"
                  )}
                </button>

                <div className="text-center border-top pt-3">
                  <Link to="/login" className="text-decoration-none fw-bold text-secondary small d-flex align-items-center justify-content-center">
                    <i className="bi bi-arrow-left me-1"></i> Cancelar e Voltar
                  </Link>
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