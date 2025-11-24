import { useEffect, useState } from "react";
import { buscarTodosUsuarios } from "../../services/usuarioService";
import type { Usuario } from "../../types";

function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const dados = await buscarTodosUsuarios();
        setUsuarios(dados);
      } catch (error) {
        console.error("Erro ao carregar usuários", error);
      }
    };

    carregarUsuarios(); 
  }, []);

  return (
    <div className="container mt-4"> 
      <h2 className="mb-4">Painel de Usuários</h2>
      
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark"> 
            <tr>
              <th>ID</th> 
              <th>Nome</th>
              <th>CPF</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;