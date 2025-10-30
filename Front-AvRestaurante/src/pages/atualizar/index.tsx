import React, { useState, useEffect } from 'react';

// Interfaces (não precisam de mudança)
interface Avaliacao {
  id: number;
  nomeRestaurante: string;
  nota: number;
  comentario: string;
}

interface AtualizarProps {
  restaurantToEdit: Avaliacao | null;
  onClose: () => void;
  onUpdate: (updatedAvaliacao: Avaliacao) => void;
  isSubmitting: boolean; // 1. NOVA PROPRIEDADE PARA CONTROLAR O LOADING
}

function Atualizar({ restaurantToEdit, onClose, onUpdate, isSubmitting }: AtualizarProps) {
  const [nomeRestaurante, setNomeRestaurante] = useState('');
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    if (restaurantToEdit) {
      setNomeRestaurante(restaurantToEdit.nomeRestaurante);
      setNota(restaurantToEdit.nota);
      setComentario(restaurantToEdit.comentario);
    }
  }, [restaurantToEdit]);

  if (!restaurantToEdit) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate({
      ...restaurantToEdit,
      nomeRestaurante: nomeRestaurante,
      nota,
      comentario,
    });
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Editar Avaliação</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                {/* Campos do formulário (não precisam de mudança) */}
                <div className="mb-3">
                  <label className="form-label">Nome do Restaurante</label>
                  <input type="text" className="form-control" value={nomeRestaurante} onChange={(e) => setNomeRestaurante(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nota (1 a 5)</label>
                  <input type="number" className="form-control" value={nota === 0 ? '' : nota} onChange={(e) => setNota(parseInt(e.target.value) || 0)} min="1" max="5" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Comentário</label>
                  <textarea className="form-control" value={comentario} onChange={(e) => setComentario(e.target.value)} rows={3}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                
                {/* 2. BOTÃO "SALVAR" COM LÓGICA DE LOADING */}
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status" className="ms-2">Salvando...</span>
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Atualizar;