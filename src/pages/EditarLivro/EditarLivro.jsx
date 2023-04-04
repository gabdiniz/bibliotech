import { useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getLivro, updateLivro, uploadCapaLivro } from "../../firebase/livros";
import { firebaseError } from "../../firebase/erros";
import { categorias } from "../../firebase/CategoriaLivros";

export function EditarLivro() {

    const {id} = useParams();

    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        const imagem = data.imagem[0];
        if(imagem) {
            const toastId = toast.loading("Upload da imagem...", {position: "top-right"});
            uploadCapaLivro(imagem).then(url => {
                toast.dismiss(toastId);
                data.urlCapa = url;
                delete data.imagem;
                updateLivro(id, data).then(() => {
                    toast.success("Livro editado com sucesso!", {duration: 2000, position: "bottom-right"})
                    navigate("/livros");
                })
            })
        }
        else {
            delete data.imagem;
            updateLivro(id, data).then(() => {
                toast.success("Livro editado com sucesso!", {duration: 2000, position: "bottom-right"})
                navigate("/livros");
            })
        }
        
    }

    useEffect(() => {
        getLivro(id).then(livro => {
            reset(livro);
        })
    }, [id, reset]);

    return (
        <div className="editar-livro">
            <Container>
                <h1>Editar livro</h1>
                <hr />
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" className={errors.titulo && "is-invalid"} {...register("titulo", {required: "Título é obrigatório!", maxLength: {value: 255, message: "Limite de 255 caracteres!"}})} />
                        <Form.Text className="text-danger">
                            {firebaseError(errors.titulo?.message) }
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control type="text" className={errors.autor && "is-invalid"} {...register("autor", {required: "Autor é obrigatório!", maxLength: {value: 255, message: "Limite de 255 caracteres!"}})} />
                        <Form.Text className="text-danger">
                            {firebaseError(errors.autor?.message) }
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Categoria</Form.Label>
                        <Form.Select {...register("categoria", { required: "Categoria e obrigatorio!" })} aria-label="Default select example">
                        <option disabled >Escolha uma opção</option>
                            {categorias.map((cat) => (
                                <option>{cat}</option>
                            ))}
                        </Form.Select>
                        <Form.Text className="text-danger">
                            {errors.categoria?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text" className={errors.isbn && "is-invalid"} {...register("isbn", {required: "ISBN é obrigatório!", maxLength: {value: 255, message: "Limite de 255 caracteres!"}})} />
                        <Form.Text className="text-danger">
                            {firebaseError(errors.isbn?.message) }
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imagem da capa</Form.Label>
                        <Form.Control type="file" {...register("imagem")} />
                    </Form.Group>
                    <Button type="submit" variant="success">Editar</Button>
                </Form>
                <br/>
            </Container>
        </div>
    )
}