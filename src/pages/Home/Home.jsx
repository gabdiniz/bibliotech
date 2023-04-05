import { Link } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { getAutores } from "../../firebase/autores";
import "./Home.css"

export function Home() {

  const [autores, setAutores] = useState(null);

  useEffect(() => {
    getAutores().then((busca) => {
      setAutores(busca);
    })
  }, [])

  return (
    <div>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
        </div>
        <br />
        <hr/>
        <h5>  Espaço dedicado para os autores: os maiores nomes da literatura  estão aqui!</h5>
        <br />
        <Button as={Link} to="/autores/adicionar" variant="success">Cadastrar novo Autor</Button>
        <br />
        {autores === null ? <Loader />
          :
          <section className="card-autores-card">
            {autores.map((autor) => {
              return (
                <Card className="card-autores">
                  <Card.Header><b>Autor: </b>{autor.nome}</Card.Header>
                  <Card.Body >
                    <small> <b>E-mail: </b>{autor.email}</small>
                    <br />
                  </Card.Body>
                </Card>
              );
            })}
          </section>
        }
      </Container>
    </div>
  );
}



