import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { esqueciMinhaSenha } from "../../services/authService";

function EsqueceuSenha() {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Estado de loading

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true); // Trava o botão

    try {
      await esqueciMinhaSenha(email);

      // Pequeno delay para o usuário ver o sucesso visualmente
      setTimeout(() => {
        navigator("/redefinirSenha", { state: { email: email } });
      }, 500);
    } catch (err: any) {
      console.error("Erro ao enviar e-mail de recuperação:", err);
      if (err.response && err.response.data) {
        const errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : "Não foi possível enviar a solicitação. Verifique o e-mail.";
        setError(errorMessage);
      } else {
        setError("Ocorreu um erro de conexão. Tente novamente.");
      }
    } finally {
      setIsLoading(false); // Destrava o botão
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <div className="col-11 col-md-10 col-lg-9 col-xl-8">
        <div
          className="row align-items-stretch shadow-lg"
          style={{
            backgroundColor: "white",
            borderRadius: "1.5rem",
            overflow: "hidden",
          }}
        >
          {/* Lado Esquerdo - Marca (Igual ao Cadastro para manter padrão) */}
          <div className="col-md-6 text-center text-md-start p-5 d-none d-md-flex flex-column justify-content-center bg-primary bg-opacity-10">
            <h1 className="display-5 fw-bold text-primary">
              <i className="bi bi-patch-check-fill me-3"></i>
              Avalioo
            </h1>
            <p className="lead text-muted mt-3">
              Não se preocupe! Vamos ajudar você a recuperar o acesso à sua
              conta em poucos passos.
            </p>
          </div>

          {/* Lado Direito - Formulário */}
          <div className="col-md-6">
            <div className="p-5 h-100 d-flex flex-column justify-content-center">
              <div className="text-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3 text-primary">
                  <i className="bi bi-key-fill fs-3"></i>
                </div>
                <h3 className="fw-bold">Recuperar Senha</h3>
                <p className="text-muted small">
                  Informe seu e-mail cadastrado para receber o código.
                </p>
              </div>

              {error && (
                <div className="alert alert-danger rounded-3 shadow-sm text-center small animate__animated animate__shakeX">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Floating Label - Email */}
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingEmail"
                    name="email"
                    placeholder="seuemail@dominio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingEmail">E-mail Cadastrado</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Código"
                  )}
                </button>

                <div className="text-center border-top pt-3">
                  <Link
                    to="/login"
                    className="text-decoration-none fw-bold text-secondary small d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-arrow-left me-1"></i> Voltar para o
                    Login
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

export default EsqueceuSenha;
