import "./Quiz.css"
import React, { useState } from 'react';
import { questoes } from '../../data/questoes';
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import imagem from "../../assets/images/login.png"

export function Quiz() {
  const [atualQuestao, setAtualQuestao] = useState(0);
  const [ponto, setPonto] = useState(0);
  const [showPonto, setShowPonto] = useState(false);
  const navegarHome = useNavigate();
  const handleClickRespCorreta = (isCorreto) => {
    if (isCorreto) {
      setPonto(ponto + 1);
    }
    const proximaQuestao = atualQuestao + 1;
    if (proximaQuestao < questoes.length) {
      setAtualQuestao(proximaQuestao);
    } else {
      setShowPonto(true);
    }
  };
  const handleResetarQuiz = () => {
    setAtualQuestao(0);
    setPonto(0);
    setShowPonto(false);
  };
  return (
    <div className="quiz-container">
      <h1>Quiz Literário</h1>
      <img src={imagem} alt="imagem do quiz" />
      {showPonto ? (
        <div>
          <h2 >Você acertou {ponto} <br />de {questoes.length} questões!</h2>
          <div class="d-flex justify-content-center">
            <Button variant="secondary" onClick={() => navegarHome("/")} className="me-5">
              Voltar ao Menu
            </Button>
            <Button variant="secondary" onClick={handleResetarQuiz} >
              Fazer novamente
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h6>Questão {atualQuestao + 1} de {questoes.length}</h6>
            <h3 className>{questoes[atualQuestao].question}</h3>
          </div>
          <div className="d-flex flex-column">
            {questoes[atualQuestao].alternativas.map((opcaoResposta, index) => (
              <Button className="botão" variant="secondary" size="lg" onClick={() =>
                handleClickRespCorreta(opcaoResposta === questoes[atualQuestao].alternativaCorreta)}
              >{opcaoResposta}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}


