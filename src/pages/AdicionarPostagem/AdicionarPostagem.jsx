import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adicionarPostagem } from "../../firebase/postagens";
import { getLivro, getLivros } from "../../firebase/livros"

export function AdicionarPostagem() {

    const [livros, setLivros] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    function onSubmit(data) {
        getLivro(data.idLivro).then(livro => {
            delete data.idLivro;
            let novoPostagem = { ...data, livro, dataPostagem: new Date() };
            adicionarPostagem(novoPostagem).then(() => {
                toast.success("Postagem adicionada com sucesso!", { duration: 2000, position: "bottom-right" })
                navigate("/postagens");
            })
        })

    }

    useEffect(() => {
        getLivros().then(busca => {
            setLivros(busca);
        });
    }, [])

    return (
        <div className="adicionar-postagem">
            <Container>
                <h1>Adicionar nova postagem</h1>
                <hr />

                <form onSubmit={handleSubmit(onSubmit)}>

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
                        <Form.Label>Você recomenda esse livro?</Form.Label>
                        <Form.Select id="recomenda" className={errors.recomenda && "is-invalid"} {...register("recomenda", { required: "Selecione uma opção válida!" })}>
                            <option value="Sim">Sim recomendo</option>
                            <option value="Não">Não recomendo</option>
                            <option value="Não tenho certeza">Não tenho certeza</option>
                        </Form.Select>
                        <Form.Text className="invalid-feedback">
                            {errors.recomenda?.message}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Resenha</Form.Label>
                        <Form.Control type="text" as="textarea" rows={5} className={errors.resenha && "is-invalid"} {...register("resenha", { required: "Preenchimento obrigatório!", maxLength: { value: 128, message: "Limite de 128 caracteres!" } })} />
                        <Form.Text className="invalid-feedback">
                            {errors.resenha?.message}
                        </Form.Text>
                    </Form.Group>

                    <Button type="submit" variant="success">Enviar</Button>
                </form>
                <br />
            </Container>
        </div>
    );
}