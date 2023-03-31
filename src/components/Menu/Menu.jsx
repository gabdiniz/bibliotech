import "./Menu.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Menu() {
  const navigate = useNavigate();
  const usuarioLogado = useContext(AuthContext);
  const [nome, setNome] = useState();

  useEffect(() => {
    if (usuarioLogado.displayName !== null) {
      setNome(usuarioLogado.displayName);
    }
    else {
      const usuario = usuarioLogado.email.split("@")
      setNome(usuario[0])
    }
  }, [])

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
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/livros">
              Livros
            </Nav.Link>
            <Nav.Link as={Link} to="/emprestimos">
              Emprestimos
            </Nav.Link>
            <Nav.Link as={Link} to="/postagem">
             Postagens
            </Nav.Link>
            <Nav.Link as={Link} to="/ajuda">
              Ajuda
            </Nav.Link>
            <Nav.Link as={Link} to="/perfil">
              {nome}
            </Nav.Link>
            <Nav.Link onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
