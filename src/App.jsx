import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cadastro } from "./pages/Cadastro/Cadastro";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { AuthContext } from "./contexts/AuthContext";
import { AdicionarLivro } from "./pages/AdicionarLivro/AdicionarLivro";
import { Livros } from "./pages/Livros/Livros";
import { EditarLivro } from "./pages/EditarLivro/EditarLivro";
import { AdicionarEmprestimo } from "./pages/AdicionarEmprestimo/AdicionarEmprestimo";
import { Emprestimos } from "./pages/Emprestimos/Emprestimos";
import { EditarEmprestimo } from "./pages/EditarEmprestimo/EditarEmprestimo";
import { NotFound } from "./pages/NotFound/NotFound";
import { PaginaAjuda } from "./pages/PaginaAjuda/PaginaAjuda";
import { Footer } from "./pages/Footer/Footer";
import { Loading } from "./pages/Loading/Loading";
import { Postagens } from "./pages/Postagens/Postagens";
import { Perfil } from "./pages/Perfil/Perfil";
import { Quiz } from "./pages/Quiz/Quiz";
import { AdicionarPostagem } from "./pages/AdicionarPostagem/AdicionarPostagem";
import { RecuperarSenha } from "./pages/RecuperarSenha/RecuperarSenha";
import { novoUsuario } from "./firebase/usuarios";

export function App() {
  const [loading, setLoading] = useState(true);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    // Monitorar/detectar o usuário conectado
    // Fica sabendo quando loga/desloga
    onAuthStateChanged(auth, (user) => {
      // user é nulo = deslogado
      // user tem objeto = logado
      setUsuarioLogado(user);
      novoUsuario(user);
    });
    // Esse efeito irá rodar apenas uma vez
    // Quando o App for renderizado/inicializado
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      <AuthContext.Provider value={usuarioLogado}>
        <BrowserRouter>
          {loading === true ?
            <Loading />//Enquanto a pagina carrega os dados exibe a paginade loading
            :
            <Routes>
              <Route path="/" element={<Root />}>
                <Route path="/" element={<Home />} />
                <Route path="/livros" element={<Livros />} />
                <Route path="/livros/adicionar" element={<AdicionarLivro />} />
                <Route path="/livros/editar/:id" element={<EditarLivro />} />
                <Route path="/emprestimos" element={<Emprestimos />} />
                <Route path="/emprestimos/adicionar" element={<AdicionarEmprestimo />} />
                <Route path="/emprestimos/editar/:id" element={<EditarEmprestimo />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/" element={<Footer />} />
                <Route path="/ajuda" element={<PaginaAjuda />} />
                <Route path="/postagens" element={<Postagens />} />
                <Route path="/postagens/adicionar" element={<AdicionarPostagem />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/recuperar" element={<RecuperarSenha />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="*" element={<NotFound/>}/>
              <Route path="/quiz" element={<Quiz/>}/>
            </Routes>
          }
        </BrowserRouter>
      </AuthContext.Provider>
      <Toaster />
    </>
  );
}
