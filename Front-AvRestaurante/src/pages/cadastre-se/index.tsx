import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CadastroRequest } from "../../types";
import { cadastrarUsuario } from "../../services/authService";

function Cadastro() {
  const navigator = useNavigate();

  const [formData, setFormData] = useState<CadastroRequest>({
    nome: "",
    email: "",
    senha: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await cadastrarUsuario(formData);

      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      navigator("/login");
    } catch (err: any) {
      console.error("Erro no cadastro:", err);

      if (err.response && err.response.data) {
        const errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : err.response.data.message ||
              "Não foi possível realizar o cadastro.";

        setError(errorMessage);
      } else {
        setError("Ocorreu um erro de conexão. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
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
          <div className="col-md-6 text-center text-md-start p-5 d-none d-md-flex flex-column justify-content-center bg-primary bg-opacity-10">
            <h1 className="display-5 fw-bold text-primary">
              <i className="bi bi-patch-check-fill me-3"></i>
              Avalioo
            </h1>
            <p className="lead text-muted mt-3">
              Junte-se à nossa comunidade. Crie sua conta em segundos e comece a
              compartilhar suas experiências.
            </p>
          </div>

          <div className="col-md-6">
            <div className="p-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Crie sua Conta</h3>
                <p className="text-muted small">
                  Preencha os dados abaixo para começar
                </p>
              </div>

              {error && (
                <div className="alert alert-danger rounded-3 shadow-sm text-center small animate__animated animate__shakeX">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="floatingNome"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingNome">Nome Completo</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingEmail"
                    name="email"
                    placeholder="nome@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="floatingEmail">Endereço de Email</label>
                </div>

                <div className="form-floating mb-4">
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

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-pill fw-bold shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Criando conta...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </button>

                <p className="text-center mt-4 mb-0 text-muted">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="fw-bold text-decoration-none">
                    Entrar
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
