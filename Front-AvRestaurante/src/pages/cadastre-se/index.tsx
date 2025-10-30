import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}

function Cadastro() {
  const navigator = useNavigate();
  const API_URL = "http://localhost:8080"; 
  
  const [formData, setFormData] = useState<CadastroRequest>({
    nome: '',
    email: '',
    senha: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      
      await axios.post(API_URL + "/auth/register", formData);
      alert("Cadastro realizado com sucesso! Você será redirecionado para o login.");
      navigator("/login");
    } catch (err: any) {
      console.error("Erro no cadastro:", err);
      if (err.response && err.response.data) {
        
        const errorMessage = typeof err.response.data === 'string' 
          ? err.response.data
          : "Não foi possível realizar o cadastro.";
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
                <h3 className="text-center mb-4">Crie sua Conta</h3>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label className="form-label">Nome</label>
                  <input type="text" name="nome" className="form-control" placeholder="Digite seu nome" value={formData.nome} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" placeholder="Digite seu email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input type="password" name="senha" className="form-control" placeholder="Crie uma senha" value={formData.senha} onChange={handleChange} required />
                </div>
                
                <button type="submit" className="btn btn-primary w-100 mt-3">Cadastrar</button>
                
                <p className="text-center mt-4 mb-0">
                  Já tem conta? <Link to="/login">Entrar</Link>
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