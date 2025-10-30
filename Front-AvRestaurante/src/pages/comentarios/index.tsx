import React, { useState } from 'react';

interface Avaliacao {
  id: number;
  nomeRestaurante: string;
  nota: number;
  comentario: string;
}

interface Comment {
  id: number;
  autor: string;
  texto: string;
}

interface CommentsModalProps {
  restaurant: Avaliacao | null;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (restaurantId: number, commentText: string) => void;
}

function CommentsModal({ restaurant, comments, onClose, onAddComment }: CommentsModalProps) {
  const [newComment, setNewComment] = useState('');

  if (!restaurant) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newComment.trim()) {
      onAddComment(restaurant.id, newComment);
      setNewComment('');
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Comentários sobre: {restaurant.nomeRestaurante}</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {comments.length > 0 ? (
                  comments.map(comment => (
                    <div key={comment.id} className="border-bottom pb-2 mb-2">
                      <strong>{comment.autor}:</strong>
                      <p className="mb-0">{comment.texto}</p>
                    </div>
                  ))
                ) : (
                  <p>Nenhum comentário ainda. Seja o primeiro a avaliar!</p>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="commentText" className="form-label">Deixe seu comentário</label>
                  <textarea
                    id="commentText"
                    className="form-control"
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="O que você achou deste restaurante?"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar Comentário
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentsModal;