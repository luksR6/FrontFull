import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 


interface LoginRequest {
  email: string;
  senha: string;
}

interface LoginResponse {
  token: string;
}

const Login = () => {
  const navigator = useNavigate();
  const API_URL = "http://localhost:8080/";


  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    senha: "",
  });
  

  const [error, setError] = useState<string | null>(null);


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

    try {
      const response = await axios.post<LoginResponse>(
        API_URL + "auth/login",
        formData
      );

      const token = response.data.token;

   
      if (token) {
        console.log("Login bem-sucedido, mas o token não será salvo.");
        navigator("/"); 
      }
      
    } catch (err: any) {
      console.error("O login falhou:", err);
      if (err.response && err.response.status === 403) {
        setError("Email ou senha inválidos.");
      } else {
        setError("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div 
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 100%)' }}
    >
      <div className="col-11 col-md-10 col-lg-9 col-xl-8">
        <div className="row align-items-center shadow-lg" style={{ backgroundColor: 'white', borderRadius: '1rem' }}>
          
          <div className="col-md-6 text-center text-md-start p-5">
            <h1 className="display-4 fw-bold">
              <i className="bi bi-patch-check-fill me-3"></i>
              Avalioo
            </h1>
            <p className="lead text-muted">
              Encontre, avalie e descubra os melhores restaurantes da sua cidade.
            </p>
          </div>

          <div className="col-md-6 border-start">
            <div className="p-5">
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Login</h3>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="text" name="email" className="form-control" placeholder="Digite seu email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input type="password" name="senha" className="form-control" placeholder="Digite sua senha" value={formData.senha} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Entrar</button>
                <p className="text-center mt-4 mb-0">Não tem conta? <Link to="/cadastre-se">Cadastre-se</Link></p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;