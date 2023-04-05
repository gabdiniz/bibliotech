import { useEffect, useState } from "react";
import { Button, Card, Container, Modal, Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { deleteLivro, getLivros } from "../../firebase/livros";
import "./Livros.css";

export function Livros() {

    const [livros, setLivros] = useState(null);
    const [show, setShow] = useState(false);
    const [tabela, setTabela] = useState(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [LivrosSelecionado, setLivrosSelecionado] = useState(null)
    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        getLivros().then((resultados) => {
            setLivros(resultados);
        });
    }
    function buscarLivros(id) {
        getLivros(id).then((resultados) => {
            setLivros(resultados);
        });
    }

    function setFormato() {
        (tabela) ? setTabela(false) : setTabela(true);
    }

    function onDeleteLivro(id, titulo) {
        const deletar = window.confirm(
            `Tem certeza que deseja excluir o livro ${titulo}?`
        );
        if (deletar) {
            deleteLivro(id).then(() => {
                toast.success(`${titulo} apagado com sucesso!`, {
                    duration: 2000,
                    position: "bottom-right",
                });
                initializeTable();
            });
        }
    }

    return (
        <div className="livros mt-3">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Livros</h1>
                    <div>
                        <Button as={Link} to="/livros/adicionar" variant="success" className="me-2">
                            Adicionar Livro
                        </Button>
                        <Button variant="success" onClick={setFormato}>{tabela === true ? "Cards" : "Tabela"}</Button>
                    </div>
                </div>
                <hr />
                {livros === null ? (
                    <Loader />
                ) : (
                    tabela === true ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Autor</th>
                                    <th>Categoria</th>
                                    <th>ISBN</th>
                                    <th>Imagem</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {livros.map((livro) => {
                                    return (
                                        <tr key={livro.id}>
                                            <td variant="link"> <Link to={`/livros/detalhes/${livro.id}`}>{livro.titulo}</Link>
                                            <td>{livro.autor}</td>
                                            <td>{livro.categoria}</td>
                                            <td>{livro.isbn}</td>
                                            <td>
                                                <img src={livro.urlCapa} alt={livro.titulo} />
                                            </td>
                                            <td className="d-flex flex-column">
                                                <Button as={Link} to={`/livros/editar/${livro.id}`} variant="warning" className=" px-1" size="sm">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Button>
                                                <Button size="sm" variant="danger" className="mt-1 px-1" onClick={() => onDeleteLivro(livro.id, livro.titulo)}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </Button>
                                                <Button size="sm" variant="primary" className="mt-1 px-1" onClick={() => {
                                                    setLivrosSelecionado(livro)
                                                    handleShow()
                                                }}>
                                                    <i className="bi bi-body-text"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="livros-cards">
                            {livros.map((livro) => {
                                return (
                                    <Card key={livro.id} style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={livro.urlCapa} alt={livro.titulo} height="380px" />
                                        <Card.Body>
                                            <Card.Title>{livro.titulo} </Card.Title>
                                            <Card.Text>
                                                Autor: {livro.autor} <br />
                                                Categoria: {livro.categoria} <br />
                                                ISBN: {livro.isbn} <br />
                                            </Card.Text>
                                            <div className="d-flex justify-content-end align-items-end buttons">
                                                <Button as={Link} to={`/livros/editar/${livro.id}`} variant="warning" size="sm">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Button>
                                                <Button size="sm" variant="danger" onClick={() => onDeleteLivro(livro.id, livro.titulo)}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </Button>
                                                <Button size="sm" variant="primary" onClick={() => {
                                                    setLivrosSelecionado(livro)
                                                    handleShow()
                                                }}>
                                                    <i className="bi bi-body-text"></i>
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </div>
                    )
                )}
            </Container>
            <br />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{LivrosSelecionado?.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{LivrosSelecionado?.autor}</p>
                    <p>{LivrosSelecionado?.categoria}</p>
                    <p>{LivrosSelecionado?.isbn}</p>
                    <img style={{ width: "300px" }}
                        src={LivrosSelecionado?.urlCapa} alt={LivrosSelecionado?.titulo} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
