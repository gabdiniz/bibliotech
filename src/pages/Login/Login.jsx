import { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/icons/google-white.svg";
import loginImg from "../../assets/images/login.png";
import githubIcon from "../../assets/icons/github.svg"
import facebookIcon from "../../assets/icons/facebook.svg"
import { AuthContext } from "../../contexts/AuthContext";
import { loginGoogle, loginEmailSenha, loginGithub, loginFacebook } from "../../firebase/auth";
import "./login.css"
import { firebaseError } from "../../firebase/erros";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const { email, senha } = data;
    loginEmailSenha(email, senha)
      .then((user) => {
        toast.success(`Entrando como ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
        toast.error(`Um erro aconteceu. Código: ${firebaseError( erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  function onLoginGoogle() {
    loginGoogle()
      .then((user) => {
        toast.success(`Bem-vindo(a) ${user.email}`, {
          position: "bottom-right",
          duration: 2500,
        });
        navigate("/");
      })
      .catch((erro) => {
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
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
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
        toast.error(`Um erro aconteceu. Código: ${firebaseError(erro.code)}`, {
          position: "bottom-right",
          duration: 2500,
        });
      });
  }

  const usuarioLogado = useContext(AuthContext);

  // Se tiver dados no objeto, está logado
  if (usuarioLogado !== null) {
    return <Navigate to="/" />;
  }
  function mostrarSenha() {
    const botaoSenha = document.getElementById("suaSenha");
    const botaoMostrar = document.getElementById("olho");

    if (botaoSenha.type === 'password') {
      botaoSenha.setAttribute('type', 'text')
      botaoMostrar.classList.replace('bi-eye', 'bi-eye-slash-fill')
    } else {
      botaoSenha.setAttribute('type', 'password')
      botaoMostrar.classList.replace('bi-eye-slash-fill', 'bi-eye')
    }
  }

  return (
    <Container fluid className="container-login-cadastro">
      <div className="login-cadastro my-3">
        <p className="text-center">
          <img src={loginImg} width="256" alt="Logo" />
        </p>
        <h4>Bem-vindo(a) de volta!</h4>
        <p className="text-muted">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
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
        </div>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control

              type="email"
              placeholder="Seu email"
              className={errors.email ? "is-invalid" : ""}
              {...register("email", { required: "Email é obrigatório" })}
            />
            <Form.Text className="invalid-feedback">
              {firebaseError(errors.email?.message)} 
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="senha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              id="suaSenha"
              placeholder="Sua senha"
              className={errors.senha ? "is-invalid" : ""}
              {...register("senha", { required: "Senha é obrigatória" })}
            />
            <Form.Text className="invalid-feedback">
              {firebaseError(errors.senha?.message) }
            </Form.Text>
          </Form.Group>
          <div>
            <Button className="me-1" type="button" variant="success " onClick={mostrarSenha} id="olho">
              <i class="bi bi-eye"></i>
            </Button>
            <Button type="submit" variant="success" className="my-3">Entrar</Button>
          </div>
          <Link to="/recuperar" > Recuperar senha
          </Link>
        </Form>
      </div>
    </Container>
  );
}
