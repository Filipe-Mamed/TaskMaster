import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import api from "../services/api";
import Input from "../components/form/input";
import SubmitButton from "../components/form/SubmitButton";

// Estiliza o contêiner principal da página
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f2f5;
`;
// Estiliza o formulário
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0.8rem;
`;
// Estiliza o grupo de formulário
const FormGroup = styled.div`
  margin-bottom: 1rem;
`;
// Estiliza a mensagem de limite de caracteres
const CharacterLimitMessage = styled.span`
  font-size: 0.9rem;
  color: #888;
  margin-top: 0.5rem;
`;

function CriarFeedback() {
  // Define o estado 'mensagem' e a função para atualizá-lo
  const [mensagem, setMensagem] = useState("");
  // Define o estado 'caracteresRestantes' e a função para atualizá-lo
  const [caracteresRestantes, setCaracteresRestantes] = useState(400);
   // Define o número máximo de caracteres
  const maxCharacters = 400;

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
    
    // Faz uma requisição POST à API para enviar o feedback
    api
      .post("/feedback", { mensagem })
      .then((res) => {
        toast.success("Feedback enviado com sucesso!"); // Exibe uma notificação de sucesso
        setMensagem(""); // Reseta o campo de mensagem
        setCaracteresRestantes(maxCharacters); // Reseta o contador de caracteres
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.erros) {
          err.response.data.erros.forEach((erro) => {
            toast.error(erro.message); // Exibe uma notificação de erro para cada erro retornado (erro.message vem do Back-End)
          });
        } else {
          toast.error("Erro ao enviar feedback, tente novamente.", err); // Exibe uma notificação de erro genérica
        }
      });
  };

  // Função para lidar com mudanças no campo de mensagem
  const handleChange = (e) => {
    const mensagemAtual = e.target.value; // Obtém o valor atual do campo de mensagem
    if (mensagemAtual.length <= maxCharacters) {
      setMensagem(mensagemAtual); // Atualiza o estado 'mensagem'
      setCaracteresRestantes(maxCharacters - mensagemAtual.length); // Atualiza o contador de caracteres restantes
    } else {
      toast.warn(`Você atingiu o limite de ${maxCharacters} caracteres.`); // Exibe uma notificação de aviso
    }
  };

  return (
    <Container>
      <h2>Envie seu Feedback</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            label="Mensagem:"
            placeholder="Escreva aqui o seu feedback..."
            name="mensagem"
            type="textarea"
            rows={5}
            value={mensagem}
            onChange={handleChange}
          />
          <CharacterLimitMessage>
          {caracteresRestantes} caracteres restantes. {/* Exibe o contador de caracteres restantes */}
          </CharacterLimitMessage>
        </FormGroup>
        <SubmitButton text="Enviar" />
      </Form>
    </Container>
  );
}

export default CriarFeedback;
