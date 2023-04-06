import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Menu } from "../../components/Menu/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { Footer } from "../Footer/Footer";

// Layout principal do App com Navbar Fixa
// As páginas com Navbar fixa: home, livros, empréstimos, etc
import { ThemeContext } from '../../contexts/ThemeContext';

export function Root() {
  const usuarioLogado = useContext(AuthContext);
  const [temaEscuro] = useContext(ThemeContext)

  if (usuarioLogado === null) {
    // se está deslogado
    // redireciona para a página de login
    return <Navigate to="/login" />;
  }
  

  return (
    <>
      <header >
        <Menu />
      </header>
      <main className={temaEscuro?'bg-dark text-secondary':'bg-ligth'}>
        <Outlet />
      </main>
      <div>
        <Footer/>
      </div>
    </>
  );
}
