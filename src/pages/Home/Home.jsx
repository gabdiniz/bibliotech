
import { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { getEmprestimo, getEmprestimos } from "../../firebase/emprestimos";
import { getLivros } from "../../firebase/livros"
import { getUsuarios } from "../../firebase/usuarios";
import { getAutores } from "../../firebase/autores";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import "./Home.css"
import { ThemeContext } from '../../contexts/ThemeContext';
import { useContext } from "react";

export function Home() {
  const [emprestimos, setEmprestimos] = useState(0)
  const [livros, setLivros] = useState(0)
  const [livrosPendentes, setlivrosPendentes] = useState(0)
  const [livrosEntregues, setlivrosEntregues] = useState(0)
  const [usuario, setUsuario] = useState(0);
  const [temaEscuro] = useContext(ThemeContext);

  useEffect(() => {
    getLivros().then((busca) => {
      setLivros(busca.length)
    })
    getEmprestimo().then((emprestimos) => {
      const numEmprestimos = emprestimos ? emprestimos.filter((livro) => livro).lenght : 0;
      setEmprestimos(numEmprestimos)
    })
    getUsuarios().then((busca) => {
      setUsuario(busca.length)
    })

  }, [])

  useEffect(() => {
    getEmprestimos().then((busca) => {
      setEmprestimos(busca.length)
    })
    getEmprestimos().then((emprestimos) => {
      const pendentes = emprestimos.filter((e) => e.status ===
        'Pendente').length
      const entregues = emprestimos.filter((e) => e.status ===
        'Entregue').length
      setlivrosEntregues(pendentes)
      setlivrosPendentes(entregues)
    })

  }, [])
  const greenTitle = true
  const green_Title = true
  const yellowTitle = true

  const [autores, setAutores] = useState(null);

  useEffect(() => {
    getAutores().then((busca) => {
      setAutores(busca);
    })
  }, [])

  return (

    <Container className=" mt-3 mb-3">
      <h2>Estatísticas </h2>
      <div className="d-flex justify-content-around mt-3 mb-3">

        <Card style={{ width: '18rem' }}>

          <Card.Body className="card-de-informaçao" >
            <Card.Title className="letras" >Total de usuarios</Card.Title>
            <Card.Text className={greenTitle ? "green-title" : "title"}
            >
              {usuario}
            </Card.Text>

          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body className="card-de-informaçao">
            <Card.Title>Total de livros</Card.Title>
            <Card.Text className={greenTitle ? "green-title" : "title"}>
              {livros}
            </Card.Text>

          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Body className="card-de-informaçao">
            <Card.Title>Total de emprestimos</Card.Title>

            <Card.Text className={green_Title ? "green_title" : "title"}>
              Livros Devolvidos:  {livrosEntregues}
            </Card.Text>
            <Card.Text className={yellowTitle ? "yellow-title" : "title"}>
              Livros Pendentes: {livrosPendentes}
            </Card.Text>

          </Card.Body>
        </Card>
      </div>

      <div>
        <hr />
        <h5>  Espaço dedicado para os autores: os maiores nomes da literatura  estão aqui!</h5>
        <br />
        <Button as={Link} to="/autores/adicionar" variant={temaEscuro?'secondary':'success'}>Cadastrar novo Autor</Button>
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
      </div>
    </Container>
  )
}






