import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { esqueciMinhaSenha } from "../../services/authService";

function EsqueceuSenha() {  
  const navigator = useNavigate(); 
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await esqueciMinhaSenha(email);
      
      navigator("/redefinirSenha", { state: { email: email } });

    } catch (err: any) {
      console.error("Erro ao enviar e-mail de recuperação:", err);
      if (err.response && err.response.data) {
        const errorMessage = typeof err.response.data === 'string' 
          ? err.response.data
          : "Não foi possível enviar a solicitação.";
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
                <h3 className="text-center mb-3">Esqueceu sua senha?</h3>
                <p className="text-center text-muted mb-4">
                  Insira seu e-mail e enviaremos um link para redefinir sua senha.
                </p>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail cadastrado</label>
                  <input 
                    type="email" 
                    id="email"   
                    name="email"   
                    className="form-control" 
                    placeholder="seuemail@dominio.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Enviar e-mail de recuperação
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

export default EsqueceuSenha;