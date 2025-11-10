import React, { useState } from "react";

interface Restaurante {
  id: number;
  nome: string;
  mediaNota: number;
}

interface Comment {
  id: number;
  nota: number;
  comentario: string;
}

interface CommentsModalProps {
  restaurante: Restaurante | null;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (nota: number, comentario: string) => void;
}

function CommentsModal({
  restaurante,
  comments,
  onClose,
  onAddComment,
}: CommentsModalProps) {
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(0);

  if (!restaurante) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (nota === 0 || !comentario.trim()) {
      console.warn("Por favor, selecione uma nota e escreva um comentário.");
      return;
    }

    onAddComment(nota, comentario);
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Avaliar: {restaurante.nome}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="notaSelect" className="form-label">
                    Sua Nota
                  </label>
                  <select
                    id="notaSelect"
                    className="form-select"
                    value={nota}
                    onChange={(e) => setNota(Number(e.target.value))}
                  >
                    <option value={0} disabled>
                      Selecione uma nota...
                    </option>
                    <option value={1}>1 - Ruim</option>
                    <option value={2}>2 - Razoável</option>
                    <option value={3}>3 - Bom</option>
                    <option value={4}>4 - Muito Bom</option>
                    <option value={5}>5 - Excelente</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="commentText" className="form-label">
                    Seu Comentário
                  </label>
                  <textarea
                    id="commentText"
                    className="form-control"
                    rows={4}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="O que você achou deste restaurante?"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar Avaliação
                </button>
              </form>

              <hr className="my-4" />
              <h5>Outros Comentários</h5>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-bottom pb-2 mb-2"
                    >
                      <strong>Nota: {comment.nota}</strong>
                      <p className="mb-0">{comment.comentario}</p>
                    </div>
                  ))
                ) : (
                  <p>Nenhum comentário ainda.</p>
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
