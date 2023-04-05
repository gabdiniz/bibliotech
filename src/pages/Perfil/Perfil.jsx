import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Perfil.css";
import { useForm } from "react-hook-form";
import { Button, Container, Form } from "react-bootstrap";
import { updateUsuario, uploadFotoPefil } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "@firebase/auth";
import semFotoPerfil from "../../assets/images/perfil/semFotoPerfil.jpg"
import { firebaseError } from "../../firebase/erros";

export function Perfil() {

  const usuarioLogado = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [imagem, setImagem] = useState(null);

  if (imagem === null) {
    (usuarioLogado.photoURL !== null) ? setImagem(usuarioLogado.photoURL) : setImagem(semFotoPerfil);
  }

  useEffect(() => {
    reset(usuarioLogado);
  }, [reset, usuarioLogado]);

  function onSubmit(data) {
    
    const img = data.imagem[0];
    if (img) {
      const toastId = toast.loading("Upload da imagem...", { position: "top-right" });
      uploadFotoPefil(img).then((url) => {
        toast.dismiss(toastId);
        data.photoURL = url;
        delete data.imagem;
        updateUsuario(usuarioLogado, data).then(() => {
          toast.success("Usuário atualizado com sucesso");
          navigate("/");
        }).catch((e) => {
          toast.error(`Um erro aconteceu. Código: ${firebaseError(e.code)}`);
        });
      })
    }
    else {
      delete data.imagem;
      updateUsuario(usuarioLogado, data).then(() => {
        toast.success("Usuário atualizado com sucesso");
        navigate("/");
      }).catch((e) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError(e.code)}`);
      });
    }
  }

  function onDelete() {
    deleteUser(usuarioLogado).then(() => {
      toast.success("Usuário deletado com sucesso");
    }).catch((e) => {
      toast.error(`Um erro aconteceu. Código: ${e.code}`);
    });
  }

  return (
    <Container className="mb-3">

      <div className="perfil">
        <div className="aside">
          <img src={imagem} alt="" />
        </div>
        <Form onSubmit={handleSubmit(onSubmit)} className="form">

          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" size="lg" className={errors.displayName && "is-invalid"} {...register("displayName", { required: "Nome é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.displayName?.message }
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" size="lg" className={errors.email && "is-invalid"} {...register("email", { required: "Email é obrigatório!", maxLength: { value: 255, message: "Limite de 255 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="text" size="lg" placeholder="********" className={errors.senha && "is-invalid"} {...register("senha", { minLength: { value: 8, message: "Mínimo de 8 caracteres!" } })} />
            <Form.Text className="text-danger">
              {errors.senha?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagem de Perfil</Form.Label>
            <Form.Control type="file" {...register("imagem")} />
          </Form.Group>

          <div className="mt-4">
            <Button type="submit" variant="success" className="me-2">Alterar</Button>
            <Button as={Link} to="/" variant="success">Cancelar</Button>
          </div>
          <div className="mt-5 d-flex justify-content-end">
            <Button variant="danger" onClick={onDelete}>Deletar perfil</Button>
          </div>
          <div>
            <Link to="/recuperacao">
              <small>Esqueceu a senha?</small>
            </Link>
          </div>
        </Form>
      </div>

    </Container>
  );
}