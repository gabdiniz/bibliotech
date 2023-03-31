import React from 'react';
import logoIcon from "./../../assets/icons/livros.png";
import { Button } from 'react-bootstrap';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

export function Footer() {
    return (
        <MDBFooter className='text-center' color='white' bgColor='success'>
            <MDBContainer className='p-4'>
                <section className='mb-4'>
                    <p className='text-uppercase fw-bold mb-4'>Acompanhe nossas redes socias:</p>

                    <Button variant="outline-light" floating className='me-2' href='#!' >
                        Facebook </Button>

                    <Button variant="outline-light" floating className='m-2' href='#!' >
                        Instagram </Button>

                    <Button variant="outline-light" floating className='m-2' href='#!' >
                        Linkedin </Button>

                    <Button variant="outline-light" floating className='m-2' href='#!' >
                        Github </Button>
                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="gem" className="me-3" /> Bibliotech
                                    <img src={logoIcon} width="50" alt="Logo" />
                                </h6>
                                <p>
                                    Somos uma Biblioteca Virtual para os amanates de leitura, temos como missão
                                    facilitar o acesso dos usuários por meio de uma plataforma 100% digital.
                                </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Produtos</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Mais vendidos
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Categorias
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Lançamentos
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Todos os produtos
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Suporte</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Como comprar
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Políticas
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Pedidos
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Ajuda
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contatos</h6>
                                <p>
                                    <MDBIcon icon="home" className="me-3" />Rua 21, Centro, São Paula/SP
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />bibliotech.contato@gmail.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" />011 3031-8596
                                </p>

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Copy:
                <a className='text-white' href='http://localhost:3001/'>
                    bibliotech.com
                </a>
            </div>
        </MDBFooter>
    );
}