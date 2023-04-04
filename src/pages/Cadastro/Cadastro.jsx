import { Button, Container, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import logoIcon from "../../assets/icons/livros.png";
import googleIcon from "../../assets/icons/google-white.svg";
import githubIcon from "../../assets/icons/github.svg"
import facebookIcon from "../../assets/icons/facebook.svg"
import { useForm } from "react-hook-form";
import { cadastrarEmailSenha, loginFacebook, loginGithub, loginGoogle } from "../../firebase/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import interrogacao from "../../assets/icons/interrogacao.png"
import { firebaseError } from "../../firebase/erros";

export function Cadastro() {

  const navegarQuiz = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    cadastrarEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code) }`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    // then = quando der certo o processo
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGithub() {
    loginGithub().then((user) => {
      toast.success(`Bem-vindo(a) ${user.email}`, {
        position: "bottom-right",
        duration: 2500,
      });
      navigate("/");
    })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code) }`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginFacebook() {
    loginFacebook().then((user) => {
      toast.success(`Bem-vindo(a) ${user.displayName}`, {
        position: "bottom-right",
        duration: 2500,
      });
      navigate("/");
    })
      .catch((erro) => {
        // tratamento de erro
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code) }`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const usuarioLogado = useContext(AuthContext);
  if (usuarioLogado !== null) {
    // se está logado
    // redireciona para a página home

    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="container-login-cadastro">
      <div className="login-cadastro my-3">
        <p className="text-center">
          <img src={logoIcon} width="256" alt="Logo do app" />
        </p>
        <h4>Faça parte da nossa plataforma</h4>
        <p className="text-muted">
          Já tem conta? <Link to="/login">Entre</Link>
        </p>
        <hr />

        <div className="d-flex flex-column" >
          <Button className="mb-1" variant="danger" onClick={onLoginGoogle}>
            <img src={googleIcon} width="32" alt="Logo do google" /> Entrar com o Google
          </Button>
          <Button className="mb-1" variant="dark" onClick={onLoginGithub}>
            <img src={githubIcon} width="32" alt="Logo do github" /> Entrar com o Github
          </Button>
          <Button className="mb-3" variant="primary" onClick={onLoginFacebook}>
            <img src={facebookIcon} width="32" alt="Logo do github" /> Entrar com o Facebook
          </Button>
          <Button className="mb-3" variant="light" onClick={() => navegarQuiz("/quiz")}>
            <img src={interrogacao} width="32" alt="Ponto de interrogação" /><h4> Realize nosso Quiz interativo</h4>
          </Button>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className={errors.email && "is-invalid"}
              placeholder="Seu email"
              {...register("email", { required: "O email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {firebaseError(errors.email?.message) }
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              className={errors.senha && "is-invalid"}
              placeholder="Sua senha"
              {...register("senha", { required: "A senha é obrigatória" })}
            />
            <Form.Text className="invalid-feedback">
              {firebaseError(errors.senha?.message) }
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="success">Cadastrar</Button>
        </Form>
      </div>
    </Container>
  );
}
