import "./Menu.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import semFotoPerfil from "../../assets/images/perfil/semFotoPerfil.jpg"

export function Menu() {
  const navigate = useNavigate();
  const usuarioLogado = useContext(AuthContext);
  const [nome, setNome] = useState();
  const [fotoPerfil, setFotoPerfil] = useState(null);

  if (fotoPerfil === null) {
    (usuarioLogado.photoURL !== null) ? setFotoPerfil(usuarioLogado.photoURL) : setFotoPerfil(semFotoPerfil);
  }

  useEffect(() => {
    if (usuarioLogado.displayName !== null) {
      setNome(usuarioLogado.displayName);
    }
    else {
      const usuario = usuarioLogado.email.split("@")
      setNome(usuario[0])
    }
  }, [usuarioLogado.email, usuarioLogado.displayName])

  function onLogout() {
    logout().then(() => {
      navigate("/login");
    });
  }

  return (
    <Navbar bg="success" variant="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoIcon} width="32" alt="Logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
              Emprestimos
            </Nav.Link>
            <Nav.Link as={Link} to="/postagens">
              Postagens
            </Nav.Link>
            <Nav.Link as={Link} to="/quiz">
             Quiz 
            </Nav.Link>
            <Nav.Link as={Link} to="/ajuda">
              Ajuda
            </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>           
            <Nav.Link as={Link} to="/perfil">
              {nome}
            </Nav.Link>
            <Link to="/perfil">
              <img src={fotoPerfil} width="32" alt="foto perfil" className="rounded-circle" id="fotoPerfil" />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
