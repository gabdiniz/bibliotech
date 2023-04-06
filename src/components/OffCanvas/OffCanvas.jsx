import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import imagem from "../../assets/icons/livros.png";
import "./OffCanvas.css";

export function OffCanvas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navegarLivros = useNavigate();
  const navegarPerfil = useNavigate();
  const navegarEmprestimo = useNavigate();
  const navegarPostagem = useNavigate();
  const navegarPoliticas = useNavigate();
  const navegarChat = useNavigate();
  const navegarQuiz = useNavigate();

  return (
    <>
      <Button className="text-dark " variant="success" onClick={handleShow}>
        Menu
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header
          className="bg-success p-2 text-dark bg-opacity-50 "
          closeButton
        >
          <Offcanvas.Title>
            <img
              className="img"
              width="100"
              src={imagem}
              alt="Bonecos em cima de livros"
            />{" "}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-success p-2 text-dark bg-opacity-50 ">
          <div className="d-flex flex-column ">
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarPerfil("/perfil")}
            >
              <i className="bi bi-person-circle me-1"></i>
              Perfil
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarLivros("/livros")}
            >
              <i className="bi bi-journal-check me-1"></i>
              Livros
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarEmprestimo("/emprestimos")}
            >
              <i class="bi bi-journal-arrow-down me-1"></i>
              Emprestimos
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarPostagem("/postagens")}
            >
              <i className="bi bi-journal-arrow-up me-1"></i>
              Postagens
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarQuiz("/quiz")}
            >
              <i className="bi bi-joystick me-1"></i>
              Quiz
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarChat("/chat")}
            >
              <i class="bi bi-chat-left-dots me-1"></i>
              Chat
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
            >
              <i className="bi bi-question-circle-fill me-1"></i>
              Ajuda
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
            >
              <i className="bi bi-person-lines-fill me-1"></i>
              Fale conosco
            </Button>
            <Button
              className="botão bg-success p-2 text-dark bg-opacity-50"
              variant="secondary"
              size="lg"
              onClick={() => navegarPoliticas("/politicasPrivacidade")}
            >
              <i className="bi bi-shield-shaded me-1"></i>
              Politica de privacidade
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
