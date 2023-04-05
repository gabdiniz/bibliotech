import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adicionarAutor } from "../../firebase/autores";
import { getAutores } from "../../firebase/autores";

export function AdicionarAutor() {

    const [autores, setAutores] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    function onSubmit(data) {
        let novoAutor = { ...data, dataAutor: new Date() };
        adicionarAutor(novoAutor).then(() => {
            toast.success("Autor cadastrado com sucesso!", { duration: 2000, position: "bottom-right" })
            navigate("/");
        })

    }

    useEffect(() => {
        getAutores().then(busca => {
            setAutores(busca);
        });
    }, [])

    return (
        <div className="adicionar-autor">
            <Container>
                <h1>Cadastrar novo Autor</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome do Autor:</Form.Label>
                        <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "nome do autor é obrigatório!", maxLength: { value: 100, message: "Limite de 100 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.nome?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control type="email" className={errors.email && "is-invalid"} {...register("email", { required: "E-mail é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.email?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success">Cadastar</Button>
                </Form>
                <br />
            </Container>
        </div>
    );
}