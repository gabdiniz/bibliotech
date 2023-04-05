import { Button, Container } from "react-bootstrap";
import "./PoliticasPrivacidade.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import imagem from "../../assets/images/login.png";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

export function PoliticasPrivacidade() {
  return (
    <div>
      <Container>
      
        <div class="d-flex justify-content-between">
        
          <h1 className="h1">Politicas de privacidade</h1>
          <img src={imagem} alt="logo" width="200" />
          
        </div>
        <hr />
        
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Politica de privacidade">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A
              voluptatibus perspiciatis culpa ex! Quisquam perferendis sit
              ratione, dolorem saepe exercitationem vero natus doloremque
              molestias, nostrum et rem provident aliquam sed.
            </p>
          </Tab>
          <Tab eventKey="profile" title="Quem Somos">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A nostrum
              vitae dolorem culpa necessitatibus molestiae perferendis eligendi,
              libero, assumenda illo aliquam, quae in tenetur quibusdam!
              Quisquam nostrum esse fuga aliquid.
            </p>
          </Tab>
          <Tab eventKey="contact" title="Termos de uso">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil
              voluptatum animi similique quibusdam voluptatibus illum harum, et
              quidem unde soluta enim suscipit accusantium. Deserunt ut tempore
              laboriosam aut molestiae consequuntur?
            </p>
          </Tab>          
        </Tabs>        
        <br />
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Perguntas frequentes</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Código do consumidor</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <br />
        <Button className=".btn-sm" variant="outline-success">
       <Link  to ="/">Voltar ao Menu</Link>
       </Button>
      </Container>
      
    </div>
  );
}
