import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getEmprestimo, getEmprestimos } from "../../firebase/emprestimos";
import {getLivros} from "../../firebase/livros"
import { getUsuarios } from "../../firebase/usuarios";
import "./Home.css"
export function Home() {
  const [emprestimos, setEmprestimos] = useState(0)
  const [livros, setLivros] = useState(0)
  const [livrosPendentes, setlivrosPendentes] = useState(0)
  const [livrosEntregues, setlivrosEntregues] = useState(0)
  const [usuario, setUsuario] = useState(0);

 useEffect(()=>{
  getLivros().then((busca) =>{
      setLivros(busca.length)
  })
  getEmprestimo().then((emprestimos) =>{
    const numEmprestimos = emprestimos ? emprestimos.filter((livro) =>livro).lenght :0;
    setEmprestimos(numEmprestimos)
  })
  getUsuarios().then((busca) =>{
    setUsuario(busca.length)
})   
  
 }, [])
 
 
  useEffect(()=>{
    getEmprestimos().then((busca) =>{
      setEmprestimos(busca.length)
    })
    getEmprestimos().then((emprestimos) =>{
      const pendentes = emprestimos.filter((e)=> e.status ===
      'Pendente').length
      const entregues = emprestimos.filter((e)=>e.status ===
      'Entregue').length
      setlivrosEntregues(pendentes)
      setlivrosPendentes(entregues)
    })      
   
  },[])
  const greenTitle = true
  const green_Title = true
  const yellowTitle = true
  
  
  return (
    <div >
      <Container className="d-flex justify-content-around mt-3 mb-3">
      <Card style={{ width: '18rem' }}>
      <Card.Body className="card-de-informaçao" >
        <Card.Title className="letras" >Total de usuarios</Card.Title>        
        <Card.Text  className={greenTitle ?"green-title" :"title" }
           >
       {usuario  }
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body className="card-de-informaçao">
        <Card.Title>Total de livros</Card.Title>        
        <Card.Text className={greenTitle ?"green-title" :"title" }>
         {livros}
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body className="card-de-informaçao">
        <Card.Title>Total de emprestimo</Card.Title>        
       
       
        <Card.Text className={green_Title ?"green_title" :"title"}>
        Livros Devolvidos:  {livrosEntregues}
        </Card.Text>
        <Card.Text className={yellowTitle ? "yellow-title" :"title"}>
         Livros Pendentes: {livrosPendentes}
        </Card.Text>
     
        
      </Card.Body>
    </Card>

      </Container>
    </div>

  )
}
