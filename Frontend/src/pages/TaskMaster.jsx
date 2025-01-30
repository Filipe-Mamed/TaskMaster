import { Link } from "react-router-dom";
import Imagem from "../img/taskmaster.png";
import styled from "styled-components";
import LinkBotao from "../components/Estilo_Botao/LinkBotao";

// Estiliza o fundo da página
const Background = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// Estiliza o cartão que contém o texto principal
const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 20px;
  max-width: 800px;
  width: 100%;
`;
// Estiliza o contêiner da imagem
const ImgWrapper = styled.div`
  position: relative;
  margin-top: 40px;
  border-radius: 19px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      rgba(255, 0, 150, 0.5),
      rgba(0, 204, 255, 0.5)
    );
    z-index: 1;
  }
  img {
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    z-index: 2;
  }
  @media (max-width: 600px) {
    max-width: 90%;
  }
  @media (min-width: 1200px) {
    max-width: 50%;
  }
`;
// Estiliza o título principal
const Heading = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;
// Estiliza o texto principal
const Text = styled.p`
  text-align: center;
  color: #555;
`;
// Estiliza o subtítulo
const SubHeading = styled.h2`
  text-align: center;
  color: #333;
  font-weight: 300;
  margin-top: 40px;
`;
// Estiliza o contêiner dos botões
const ButtonContainer = styled.div`
  margin-top: 20px;
`;

function TaskMaster() {
  return (
    <Background>
      <Card>
        <Heading>Sobre o TaskMaster</Heading>
        <Text>
          O TaskMaster é uma aplicação web que permite criar tarefas e
          organizá-las por meio de categorias. A aplicação foi desenvolvida com
          o intuito de auxiliar na organização de tarefas do dia a dia.
        </Text>
      </Card>
      <ImgWrapper>
        <img src={Imagem} alt="Imagem" />
      </ImgWrapper>
      <SubHeading>Comece a criar suas tarefas agora mesmo!</SubHeading>
      <ButtonContainer>
        <LinkBotao text="Começar" to="/login" />
      </ButtonContainer>
    </Background>
  );
}

export default TaskMaster;
