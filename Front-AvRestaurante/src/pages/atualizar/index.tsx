import React, { useState, useEffect } from 'react';
import type { Restaurante } from '../cadastroRestaurante/'; 

interface AtualizarProps {
  restaurante: Restaurante | null;
  onClose: () => void;
  onSave: (updatedRestaurante: Restaurante) => void;
  isSubmitting: boolean;
}

function Atualizar({ restaurante, onClose, onSave, isSubmitting }: AtualizarProps) {
  
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (restaurante) {
      setNome(restaurante.nome);
    }
  }, [restaurante]);

  if (!restaurante) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...restaurante,
      nome: nome,
    });
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Editar Restaurante</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onClose} 
                  disabled={isSubmitting}
                ></button>
              </div>
              <div className="modal-body">
                
                <div className="mb-3">
                  <label className="form-label">Nome do Restaurante</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required 
                  />
                </div>

              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onClose} 
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status" className="ms-2">Salvando...</span>
                    </>
                  ) : (
                    'Salvar'
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