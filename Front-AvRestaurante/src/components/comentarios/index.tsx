import React, { useState } from "react";
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import type { Restaurante, Avaliacao } from '../../types';
import restauranteService from '../../services/restauranteService';

interface CommentsModalProps {
  restaurante: Restaurante | null;
  comments: Avaliacao[];
  onClose: () => void;
  onAddComment: (nota: number, comentario: string) => void;
  onRefresh?: () => void;
  readOnly?: boolean;
}

function CommentsModal({
  restaurante,
  comments,
  onClose,
  onAddComment,
  onRefresh,
  readOnly = false
}: CommentsModalProps) {
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);

  const { usuario } = useSelector((state: RootState) => state.auth);

  if (!restaurante) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (nota === 0 || !comentario.trim()) {
      alert("Por favor, selecione uma nota e escreva um comentário.");
      return;
    }
    onAddComment(nota, comentario);
    setComentario("");
    setNota(0);
  };

  const handleDelete = async (idAvaliacao: number) => {
    if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
      try {
        await restauranteService.deletarAvaliacao(idAvaliacao);
        alert("Comentário excluído!");
        
        if (onRefresh) {
            onRefresh();
        }
        onClose();
      } catch (error) {
        alert("Erro ao deletar.");
      }
    }
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ backdropFilter: 'blur(5px)' }}
        onClick={onClose}
      ></div>
      
      <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 rounded-4 shadow-lg">
            
            <div className="modal-header border-bottom-0 pb-0 pt-4 px-4">
              <div>
                <h5 className="modal-title fw-bold">
                    {readOnly ? (
                        <span><i className="bi bi-chat-quote-fill text-primary me-2"></i>Comentários</span>
                    ) : (
                        <span><i className="bi bi-star-half text-warning me-2"></i>Avaliar</span>
                    )}
                </h5>
                <p className="text-muted small mb-0">
                    Restaurante: <strong>{restaurante.nome}</strong>
                </p>
              </div>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>

            <div className="modal-body p-4">
              {!readOnly && (
                <div className="bg-light p-3 rounded-4 mb-4 border border-light">
                  <h6 className="fw-bold mb-3 small text-uppercase text-muted">Deixe sua opinião</h6>
                  <form onSubmit={handleSubmit}>
                    
                    <div className="form-floating mb-3">
                      <select
                        id="notaSelect"
                        className="form-select border-0 shadow-sm"
                        value={nota}
                        onChange={(e) => setNota(Number(e.target.value))}
                        style={{cursor: 'pointer'}}
                      >
                        <option value={0} disabled>Selecione...</option>
                        <option value={1}>⭐ 1 - Ruim</option>
                        <option value={2}>⭐⭐ 2 - Razoável</option>
                        <option value={3}>⭐⭐⭐ 3 - Bom</option>
                        <option value={4}>⭐⭐⭐⭐ 4 - Muito Bom</option>
                        <option value={5}>⭐⭐⭐⭐⭐ 5 - Excelente</option>
                      </select>
                      <label htmlFor="notaSelect">Qual sua nota?</label>
                    </div>

                    <div className="form-floating mb-3">
                      <textarea
                        id="commentText"
                        className="form-control border-0 shadow-sm"
                        style={{ height: '100px' }}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Comentário"
                      ></textarea>
                      <label htmlFor="commentText">Escreva seu comentário...</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 rounded-3 fw-bold py-2 shadow-sm">
                        Enviar Avaliação
                    </button>
                  </form>
                </div>
              )}

              <div className="d-flex align-items-center justify-content-between mb-3 mt-2">
                <h6 className="fw-bold mb-0">
                    {comments.length} {comments.length === 1 ? 'Avaliação' : 'Avaliações'}
                </h6>
                <span className="badge bg-secondary opacity-50 rounded-pill">Recentes</span>
              </div>

              <div style={{ maxHeight: readOnly ? "60vh" : "300px", overflowY: "auto", paddingRight: '5px' }}>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="d-flex align-items-start mb-3 animate__animated animate__fadeIn">
                      
                      <div 
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                        style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}
                      >
                         {comment.usuario?.nome ? comment.usuario.nome.charAt(0).toUpperCase() : <i className="bi bi-person"></i>}
                      </div>

                      <div className="ms-3 bg-light rounded-4 p-3 w-100 position-relative">
                        <div className="d-flex justify-content-between align-items-start mb-1">
                            <div>
                                <span className="fw-bold text-dark d-block" style={{lineHeight: '1.2'}}>
                                    {comment.usuario?.nome || "Anônimo"}
                                </span>
                                <div className="text-warning small mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`bi ${i < comment.nota ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
                                    ))}
                                    <span className="text-muted ms-1" style={{fontSize: '0.8rem'}}>({comment.nota})</span>
                                </div>
                            </div>
                            
                            {((usuario && comment.usuario && usuario.email === comment.usuario.email) || readOnly) && (
                                <button
                                className="btn btn-sm btn-outline-danger border-0 rounded-circle"
                                onClick={() => handleDelete(comment.id)}
                                title="Excluir"
                                style={{width: '32px', height: '32px'}}
                                >
                                <i className="bi bi-trash"></i>
                                </button>
                            )}
                        </div>
                        
                        <p className="mb-0 text-muted mt-2" style={{fontSize: '0.95rem', lineHeight: '1.5'}}>
                            {comment.comentario}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted opacity-50">
                    <i className="bi bi-chat-square-dots display-4 d-block mb-3"></i>
                    <p>Seja o primeiro a avaliar!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsModal;