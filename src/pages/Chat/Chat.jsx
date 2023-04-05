import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { adicionarMensagem, getMensagens } from "../../firebase/mensagens";
import { Button, Container, Form } from "react-bootstrap";
import semFoto from "../../assets/images/perfil/semFotoPerfil.jpg"
import { AuthContext } from "../../contexts/AuthContext";
import "./Chat.css"

export function Chat() {

  const { register, handleSubmit } = useForm();
  const [mensagens, setMensagens] = useState([]);
  const usuarioLogado = useContext(AuthContext);
  const referencia = useRef(null);

  function onSubmit(data) {
    adicionarMensagem({ ...data, user: usuarioLogado }).then();
  }

  useEffect(() => {
    getMensagens().then((msg) => {
      setMensagens(msg)
    })
    referencia.current.scrollTop = referencia.current.scrollHeight;
  }, [mensagens])


  return (
    <Container>
      <div className="container-mensagens">
        <div className="caixaMensagens" ref={referencia} >
          {mensagens.map((msg, index) => {
            return (
              <div className={(msg?.user?.uid === usuarioLogado.uid) ? "d-flex align-items-center justify-content-start mensagem  flex-row-reverse" : " d-flex align-items-center mensagem"} key={index} >
                <div>
                  <img width="32" className="rounded-circle mx-2" src={(msg?.user?.photoURL) ? msg?.user?.photoURL : semFoto} alt="foto de perfil" />
                </div>
                <div>
                  {(msg?.user?.uid === usuarioLogado.uid) ? "" :
                    <div>
                      {(msg?.user?.displayName) ? msg?.user?.displayName : "usuario"}
                    </div>}
                  <div>
                    {msg.msg}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3 d-flex" controlId="msg">
            <Form.Control type="text" {...register("msg")} />
            <Button type="submit">Enviar</Button>
          </Form.Group>
        </Form>
      </div>
    </Container >
  )
}