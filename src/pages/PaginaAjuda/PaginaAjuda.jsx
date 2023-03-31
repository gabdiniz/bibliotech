import { Container,
     Form, 
     Nav, 
     Navbar , 
     Carousel,
     Card   } from "react-bootstrap";
import "./PaginaAjuda.css"
import image1 from "../../assets/images/livros-para-empreendedores.jpg"

import image2 from "../../assets/images/OIP.jpg"
import image3 from "../../assets/images/R.jpg"



export function PaginaAjuda() {
  return (
   <body className="im">
    <div>
      <Navbar bg="warning" variant="warning">
        <Container className="d-flex ">
          <Navbar.Brand href="#home">Home </Navbar.Brand>          
          <Nav className="me-auto">
            <Nav.Link href="#features">Fale Conosco</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <Container className="d-flex justify-content-center align-items-center">
        <div >
          <Form >
            <Form.Group
              className="row d-flex justify-content-center"
              controlId="formBasicEmail"
            >
              <Form.Label>Pesquise suas duvidas</Form.Label>
              <Form.Control size="lg" type="email" placeholder="Digite sua duvida" />
            </Form.Group>
          </Form>
        </div>
      </Container>
      <br/>
      <Container>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 image"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Novos Livros</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
          className="d-block w-100 image"
          src={image2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Livro danificado</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
         <img
       
          className="d-block w-100 image"
          src={image3}
          alt="Third slide"
        /> 

        <Carousel.Caption>
          <h3>Problemas para alugar</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

      </Container>
      <br/>
      <Container  className="d-flex justify-content-between">
      <Card  style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Fale conosco</Card.Title>
        
        <Card.Text>
            <p>Telefone para ajuda e problemas</p>
         <p>Telefone:(00) 0000-0000</p>
        </Card.Text>
        <Card.Link href="#">Email: bibliotech@gmail.com</Card.Link>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Problemas com alugueis</Card.Title>
      
        <Card.Text>
        <p>Numero para auxilio a problemas com alugueis</p>
         <p>Telefone:(00) 0010-0000</p>
        </Card.Text>
        <Card.Link href="#">Email: bibliotech.aluguel@gmail.com</Card.Link>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Danifiquei um livro, o que fazer ?</Card.Title>
       
        <Card.Text>
        <p>Se você danificou um livro alugado e precisa de auxilio ligue aqui</p>
         <p>Telefone:(00) 0020-0000</p>
        </Card.Text>
        <Card.Link href="#">Email: blibliotech.danificados@gmail.com</Card.Link>
       
      </Card.Body>
    </Card>
      </Container>


    </div>
   </body>
   
  );
}
