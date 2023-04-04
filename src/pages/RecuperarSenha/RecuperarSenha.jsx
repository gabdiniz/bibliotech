import { useForm } from "react-hook-form";
import { recoverPassword } from "../../firebase/auth";
import { Form, Container, Button } from "react-bootstrap";
import { firebaseError } from "../../firebase/erros";
import { toast } from "react-hot-toast";
import "./RecuperarSenha.css"
import loginImg from "../../assets/images/login.png";

export function RecuperarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const { email } = data;
    recoverPassword(email)
      .then(() => {
        toast.success(`Email enviado`, {
          position: "bottom-right",
          duration: 2500,
        });
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu . Codigo${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
    }
    return (
      <div className="fundo">
           
        <Container className="container-recuperar-senha">
            <Form className="recuperar-senha" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center">
          <img src={loginImg} width="256" alt="Logo" />
        </p>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Recuperar Senha</Form.Label>
            <Form.Control
              type="email"
              placeholder="Seu email"
              className={errors.email ? "is-invalid" : ""}
              {...register("email", { required: "Email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {firebaseError(errors.email?.message)}
            </Form.Text>
            <Form.Text >
            Um link de redefinição de senha sera enviado para o email digitado
            </Form.Text>
          </Form.Group>
          <div>
          <Button type="submit" variant="success" className="mt-2">Enviar</Button>
          </div>
        </Form>
        </Container>
        
      </div>
    );
  }

