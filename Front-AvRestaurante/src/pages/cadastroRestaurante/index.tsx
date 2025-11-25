import React, { useState, useEffect } from 'react';
import Atualizar from '../../components/atualizar';
import Spinner from '../../components/loading';
import restauranteService from '../../services/restauranteService';
import type { Restaurante } from '../../types';

function CadastroRestaurante() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [nome, setNome] = useState('');
  const [restauranteEmModal, setRestauranteEmModal] = useState<Restaurante | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRestaurantes = async () => {
    setIsLoadingPage(true);
    try {
      const dados = await restauranteService.listarRestaurantesDoAdmin();
      setRestaurantes(dados);
    } catch (error) {
      console.error("Erro ao buscar restaurantes:", error);
    } finally {
      setIsLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchRestaurantes();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await restauranteService.cadastrarRestaurante(nome);
      await fetchRestaurantes();
      setNome('');
    } catch (error) {
      console.error("Erro ao adicionar restaurante:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRestaurant = async (updatedRestaurante: Restaurante) => {
    setIsSubmitting(true);
    try {
      await restauranteService.atualizarRestaurante(updatedRestaurante.id, updatedRestaurante.nome);
      await fetchRestaurantes();
      setRestauranteEmModal(null);
    } catch (error) {
      console.error("Erro ao atualizar restaurante:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (idToDelete: number) => {
    if (window.confirm("Tem certeza que deseja excluir este restaurante?")) {
      try {
        await restauranteService.deletarRestaurante(idToDelete);
        setRestaurantes(prev => prev.filter(r => r.id !== idToDelete));
      } catch (error) {
        console.error("Erro ao deletar restaurante:", error);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-5">
        <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
          <i className="bi bi-shop-window text-primary fs-3"></i>
        </div>
        <div>
          <h2 className="fw-bold mb-0">Gerenciar Restaurantes</h2>
          <p className="text-muted mb-0">Cadastre e administre seus estabelecimentos</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-plus-circle-fill text-success me-2"></i>
                Novo Restaurante
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="floatingNomeRestaurante"
                    placeholder="Nome do Restaurante"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                  <label htmlFor="floatingNomeRestaurante">Nome do Estabelecimento</label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 rounded-3 fw-bold shadow-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      Cadastrando...
                    </>
                  ) : (
                    "Cadastrar"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
              <h5 className="fw-bold mb-0 d-flex align-items-center">
                <i className="bi bi-list-ul me-2"></i>
                Seus Restaurantes
                <span className="badge bg-secondary bg-opacity-10 text-secondary ms-2 rounded-pill">
                  {restaurantes.length}
                </span>
              </h5>
            </div>
            <div className="card-body p-4">
              {isLoadingPage ? (
                <div className="d-flex justify-content-center py-5">
                  <Spinner />
                </div>
              ) : (
                <>
                  {restaurantes.length > 0 ? (
                    <div className="list-group list-group-flush gap-2">
                      {restaurantes.map(r => (
                        <div
                          key={r.id}
                          className="list-group-item border-0 bg-light rounded-3 d-flex justify-content-between align-items-center p-3 mb-1 hover-shadow transition-all"
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-white p-2 rounded-circle shadow-sm me-3 text-primary d-flex align-items-center justify-content-center"
                              style={{ width: '40px', height: '40px' }}
                            >
                              <i className="bi bi-shop"></i>
                            </div>
                            <div>
                              <h6 className="mb-0 fw-bold text-dark">{r.nome}</h6>
                              <small className="text-muted">ID: {r.id}</small>
                            </div>
                          </div>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-white border shadow-sm btn-sm rounded-circle d-flex align-items-center justify-content-center text-primary"
                              style={{ width: '32px', height: '32px' }}
                              onClick={() => setRestauranteEmModal(r)}
                              title="Editar"
                            >
                              <i className="bi bi-pencil-fill" style={{ fontSize: '0.8rem' }}></i>
                            </button>
                            <button
                              className="btn btn-white border shadow-sm btn-sm rounded-circle d-flex align-items-center justify-content-center text-danger"
                              style={{ width: '32px', height: '32px' }}
                              onClick={() => handleDelete(r.id)}
                              title="Excluir"
                            >
                              <i className="bi bi-trash-fill" style={{ fontSize: '0.8rem' }}></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5 text-muted">
                      <i className="bi bi-shop-window display-4 d-block mb-3 opacity-25"></i>
                      <p>Nenhum restaurante cadastrado.</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {restauranteEmModal && (
        <Atualizar
          restaurante={restauranteEmModal}
          onSave={handleUpdateRestaurant}
          onClose={() => setRestauranteEmModal(null)}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default CadastroRestaurante;
