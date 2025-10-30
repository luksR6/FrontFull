import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAdmin";
import Home from "./pages/home/home";
import Login from "./pages/login";
import LayoutLogin from "./components/LayoutLogin";
import Cadastro from "./pages/cadastre-se";
import Restaurantes from "./pages/restaurantes";
import CadastroRestaurante from "./pages/cadastroRestaurante";
import Perfil from "./pages/perfil";
import EsqueceuSenha from "./pages/esqueceuSenha";
import RedefinirSenha from "./pages/redefinirSenha";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas de autenticação (usam LayoutLogin) */}
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
        <Route path="/esqueceuSenha" element={<EsqueceuSenha />} />
        <Route path="/redefinirSenha" element={<RedefinirSenha />} />
      </Route>

      {/* Rotas do sistema (usam LayoutAdmin) */}
      <Route element={<LayoutAdmin />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/cadastroRestaurante" element={<CadastroRestaurante />}></Route>
        <Route path="/perfil" element={<Perfil />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
