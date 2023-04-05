import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getPostagens } from "../../firebase/postagens";
import { Loader } from "../../components/Loader/Loader";
import React from 'react';
import "./Postagens.css"

export function Postagens() {

    const [postagens, setPostagens] = useState(null);

    useEffect(() => {
        getPostagens().then(busca => {
            setPostagens(busca);
        })
    }, [])

    return (
        <div className="postagens">
            <Container>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Postagens</h1>
                    <Button as={Link} to="/postagens/adicionar" variant="success">Adicionar Postagem</Button>
                </div>
                <hr />
                <h5>Compartilhe sua experiência com outros usuários da Bibliotech</h5>
                <br />
                {postagens === null ? <Loader />
                    :
                    <section className="post-postagens">
                        {postagens.map((postagem, index) => {
                            const dataPostagem = postagem.dataPostagem.toDate().toLocaleDateString('pt-br');
                            return (
                                <Card key={index} className="card-postagem-card">
                                    <Card.Header><b>Leitor: </b>{postagem.leitor}</Card.Header>
                                    <Card.Body >
                                        <Card.Text><b>Livro: {postagem.livro.titulo}</b></Card.Text>
                                        <Card.Text><b>Autor: </b>{postagem.livro.autor}</Card.Text>
                                        <Card.Text><b>Recomenda: </b>{postagem.recomenda}</Card.Text>
                                        <Card.Text><b>Resenha: </b><i>"{postagem.resenha}"</i></Card.Text>
                                        <small><b>Data de publicação: </b>{dataPostagem}</small>
                                       <br/>
                                        <br />
                                        <Button className="bi-pencil-fill" size="sm" variant="warning"></Button>
                                        <Button className="bi-trash3-fill" size="sm" variant="danger"></Button>
                                        <hr />
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </section>}
            </Container >
        </div >
    );
}