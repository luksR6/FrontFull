import React, { useState, useEffect } from 'react';
import type { Restaurante } from '../../types'; 

interface AtualizarProps {
  restaurante: Restaurante | null;
  onClose: () => void;
  onSave: (restauranteAtualizado: Restaurante) => void; 
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

    const restauranteAtualizado: Restaurante = {
      ...restaurante,
      nome: nome,
    };

    onSave(restauranteAtualizado);
  };

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        style={{ backdropFilter: 'blur(4px)' }} 
        onClick={isSubmitting ? undefined : onClose}
      ></div>
      
      <div className="modal fade show" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          
          <div className="modal-content border-0 rounded-4 shadow-lg">
            
            <form onSubmit={handleSubmit}>
              <div className="modal-header border-bottom-0 pb-0">
                <h5 className="modal-title fw-bold fs-5">
                    <i className="bi bi-pencil-square text-primary me-2"></i>
                    Editar Restaurante
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={onClose} 
                  disabled={isSubmitting}
                ></button>
              </div>

              <div className="modal-body p-4">
                <p className="text-muted small mb-3">
                    Altere o nome do estabelecimento abaixo.
                </p>

                <div className="form-floating mb-2">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="floatingNome" 
                    placeholder="Nome do Restaurante"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required 
                    autoFocus
                  />
                  <label htmlFor="floatingNome">Nome do Restaurante</label>
                </div>
              </div>

              <div className="modal-footer border-top-0 pt-0 pb-4 px-4">
                <button 
                  type="button" 
                  className="btn btn-light rounded-3 px-3 fw-bold text-muted" 
                  onClick={onClose} 
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                
                <button 
                  type="submit" 
                  className="btn btn-primary rounded-3 px-4 fw-bold shadow-sm" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                        Salvar Alterações
                    </>
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