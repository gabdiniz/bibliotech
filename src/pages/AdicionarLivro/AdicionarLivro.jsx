import { Breadcrumb, Button, Container, Form, Badge } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { addLivro, uploadCapaLivro } from "../../firebase/livros";
import { categorias } from "../../firebase/CategoriaLivros";
import { getAutores } from "../../firebase/autores";
import { useState, useEffect } from 'react';

export function AdicionarLivro() {

    const [autores, setAutores] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        const imagem = data.imagem[0];
        if (imagem) {
            const toastId = toast.loading("Upload da imagem...", {
                position: "top-right",
            });
            uploadCapaLivro(imagem).then((url) => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                addLivro(data).then(() => {
                    toast.success("Livro adicionado com sucesso!", {
                        duration: 2000,
                        position: "bottom-right",
                    });
                    navigate("/livros");
                });
            });
        } else {
            delete data.imagem;
            addLivro(data).then(() => {
                toast.success("Livro adicionado com sucesso!", {
                    duration: 2000,
                    position: "bottom-right",
                });
                navigate("/livros");
            });
        }
    }

    function selecioneAutor() {
        getAutores().then(busca => {
            setAutores(busca)
        })
    }
    useEffect(() => {
        selecioneAutor();
    }, [])

    return (
        <div className="adicionar-livro">
            <div className="p-1">
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate("/livros")}>Livros</Breadcrumb.Item>
                    <Breadcrumb.Item active>Adicionar</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Container>
                <h1>Adicionar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            className={errors.titulo && "is-invalid"}
                            {...register("titulo", {
                                required: "Título é obrigatório!",
                                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.titulo?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Autor .</Form.Label>
                        <Badge bg="success" as={Link} to="/autores/adicionar">
                            cadastrar novo
                        </Badge>
                        <Form.Select type="text" className={errors.autor && "is-invalid"}
                            {...register("autor", {
                                required: "Autor é obrigatório!",
                                maxLength: { value: 80, message: "Limite de 80 caracteres!" }
                            })}>
                            <option value="" selected disabled>Selecione um Autor</option>
                            {autores.map(selecioneautor => {
                                return <option key={selecioneautor.id}>{selecioneautor.nome}</option>
                            })}
                        </Form.Select>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select {...register("categoria", { required: "Categoria é obrigatorio!" })} aria-label="Default select example">
                            <option value="" selected disabled >Selecione uma opção</option>
                            {categorias.map((cat) => (
                                <option>{cat}</option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            className={errors.isbn && "is-invalid"}
                            {...register("isbn", {
                                required: "ISBN é obrigatório!",
                                maxLength: { value: 255, message: "Limite de 255 caracteres!" },
                            })}
                        />
                        <Form.Text className="text-danger">
                            {errors.isbn?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Sinopse</Form.Label>
                        <Form.Control type="text" as="textarea" rows={4} placeholder="Faça uma breve descrição sobre o livro..." className={errors.info && "is-invalid"} {...register("info", { required: "Sinopse é obrigatório!", maxLength: { value: 600, message: "Limite de 600 caracteres!" } })} />
                        <Form.Text className="text-danger"  >
                            {errors.info?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Imagem da capa</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".png,.jpg,.jpeg,.gif"
                            {...register("imagem")}
                        />
                    </Form.Group>

                    <Button type="submit" variant="success">
                        Adicionar
                    </Button>

                </Form>
                <br />
            </Container>
        </div>
    );
}