import { useEffect, useState } from "react";
import {
  buscarTodosUsuarios,
  type Usuario,
} from "../../services/usuarioService";

function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const carregarUsuarios = async () => {
      const usuarios = await buscarTodosUsuarios();
      setUsuarios(usuarios);
    };

    carregarUsuarios;
  }, []);

  return (
    <div className="mt-4">
      <h2 className="mt-4">Painel de Usuarios</h2>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <td>ID</td>
            <td>Nome</td>
            <td>CPF</td>
            <td>Email</td>
          </tr>
        </thead>

        <body>
          {usuarios.map((usuarios) => (
            <tr key={usuarios.id}>
              <td>{usuarios.id}</td>
              <td>{usuarios.nome}</td>
              <td>{usuarios.CPF}</td>
              <td>{usuarios.email}</td>
            </tr>
          ))}
        </body>
      </table>
    </div>
  );
}

export default Usuarios;
