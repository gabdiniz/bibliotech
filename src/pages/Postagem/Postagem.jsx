import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import { getLivros } from "../../firebase/livros"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Postagem() {

    const [livros, setLivros] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    function onSubmitPostagem(data) {
        console.log(data);
    }

    useEffect(() => {
        getLivros().then(busca => {
            setLivros(busca);
        });
    }, [])

    function onSubmitPostagem() {
        toast.success("Postagem adicionada com sucesso!", { duration: 2000, position: "bottom-right" })
        navigate("/livros");
    }

    return (
        <Container>
            <div className="postagemblog">

                <h1>Formulário de Postagens</h1>
                <br />
                <h5>Compartilhe sua experiência com outros usuários</h5>
                <br />

                <form onSubmit={handleSubmit(onSubmitPostagem)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Leitor</Form.Label>
                        <Form.Control type="text" className={errors.leitor && "is-invalid"} {...register("leitor", { required: "Leitor é obrigatório!", maxLength: { value: 30, message: "Limite de 30 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.leitor?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Selecione o Livro</Form.Label>
                        <Form.Select className={errors.idLivro && "is-invalid"} {...register("idLivro", { required: "Livro é obrigatório!" })}>
                            {livros.map(livro => <option key={livro.id} value={livro.id}>{livro.titulo}</option>)}
                        </Form.Select>
                        <Form.Text className="invalid-feedback">
                            {errors.idLivro?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Título do post</Form.Label>
                        <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", { required: "titulo é obrigatório!", maxLength: { value: 50, message: "Limite de 50 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.titulo?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Resenha</Form.Label>
                        <Form.Control type="text" as="textarea" rows={5} className={errors.post && "is-invalid"} {...register("post", { required: "post é obrigatório!", maxLength: { value: 128, message: "Limite de 128 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.post?.message}
                        </Form.Text>
                    </Form.Group>

                    <Button type="submit" variant="success">Enviar Postagem</Button>

                </form>
                <br />
            </div>
        </Container>
    )
}