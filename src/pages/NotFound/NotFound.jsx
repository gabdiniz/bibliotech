import imagem from "../../assets/images/login.png";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./NotFound.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navegarHome = useNavigate();
  const navegarLogin = useNavigate();

  return (
    <div className="tela">
      <div>
        <img width="400" src={imagem} alt="Bonecos em cima de livros" />
        <br />
        <h1>Ops!</h1>
        <br />
        <h1 className="titulo"> Página não encontrada. </h1>
      </div>
      <br />
      <ButtonGroup size="lg" className="mb-2">
        <Button variant="secondary" onClick={() => navegarHome("/")}>
          Home
        </Button>
        <Button variant="info" onClick={() => navegarLogin("/login")}>
          Login
        </Button>

        <Button variant="danger" onClick={handleShow} size="lg">
          Reportar
        </Button>
      </ButtonGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Problemas com a página?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deixe sua mensagem para quer possamos te ajudar</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
