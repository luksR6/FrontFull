import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAdmin";
import Home from "./pages/home/home";
import Login from "./pages/login";
import LayoutLogin from "./components/LayoutLogin";
import Cadastro from "./pages/cadastre-se";
import Restaurantes from "./pages/restaurantes";
import CadastroRestaurante from "./pages/cadastroRestaurante";

function AppRoutes() {
  return (
    <Routes>
      {/* Rotas de autenticação (usam LayoutLogin) */}
      <Route element={<LayoutLogin />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
      </Route>

      {/* Rotas do sistema (usam LayoutAdmin) */}
      <Route element={<LayoutAdmin />}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/cadastroRestaurante" element={<CadastroRestaurante />}></Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
