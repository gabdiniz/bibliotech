import { useEffect, useState } from "react";
import { Button, Container, Card, CardGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getLivro } from "../../firebase/livros";
import "./DetalhesLivro.css"

export function DetalhesLivro() {

  const { id } = useParams();
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    getLivro(id).then((livro) => {
      setLivro(livro);
    });
  }, [id]);

  return (
    <div className="detalhes-livro">
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <br /><br />
        </div>
        <h1>Livro: {livro?.titulo}</h1>
        <h5 className="text-muted">{livro?.autor}</h5>
        <br />

        <CardGroup key={livro}>
          <Card className="d-flex justify-content align-items-center cardsdetalhes">
            <Card.Img style={{ width: "300px" }} src={livro?.urlCapa} />
          </Card>
          <Card className="align-items-center cardsdetalhes">
            <h3><b>Sinopse: </b>
              <br />
              <br />
            </h3>
            <i>{livro?.info}</i>
            <br />
            <Card.Text><b>Categoria: </b>
              {livro?.categoria}
            </Card.Text>
            <Card.Text><b>ISBN: </b>
              {livro?.isbn}
            </Card.Text>
            <br/>
            <Button className="botao-detalhes" size="sm" as={Link} to="/emprestimos/adicionar" variant="success">Pegar emprestado</Button>
            <br />
            <Button className="botao-detalhes" size="sm" as={Link} to="/postagens/adicionar" variant="success">Deixar resenha</Button>
          </Card>
        </CardGroup>

        <br />
      </Container>
    </div>
  );
}