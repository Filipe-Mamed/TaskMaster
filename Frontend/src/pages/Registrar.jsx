import { useState, useContext } from "react";
import api from "../services/api";
import styled from "styled-components";
import Input from "../components/form/input";
import SubmitButton from "../components/form/SubmitButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/Autentificação_Global/AuthContext";

// Estiliza o contêiner do formulário
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

// Estiliza o formulário
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

// Estiliza o título do formulário
const Title = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333333;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

function Registrar() {
  // Define estados para nome, email, senha e confirmação de senha
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const { registrar } = useContext(AuthContext); // Obtém a função registrar do contexto de autenticação

  const navigate = useNavigate(); // Hook para navegação programática

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Faz uma requisição POST à API para registrar um novo usuário
    api
      .post("/usuario/registrar", { nome, email, senha, senha2 }, { withCredentials: true })
      .then(function (res) {
        registrar(); // Atualiza o estado de registrar
        toast.success("Registro efetuado com sucesso!");
        navigate("/minhastarefas");
      })
      .catch(function (err) {
        if (err.response && err.response.data && err.response.data.erros) {
          err.response.data.erros.forEach((erro) => {
            toast.error(erro.message);
          });
        } else {
          toast.error("Erro ao registrar, tente novamente.");
        }
      });
  };
  // Função para lidar com mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nome") setNome(value);
    if (name === "email") setEmail(value);
    if (name === "senha") setSenha(value);
    if (name === "senha2") setSenha2(value);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Registrar</Title>
        <Input
          label="Nome:"
          name="nome"
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={handleChange}
        />
        <Input
          label="Email:"
          name="email"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleChange}
        />
        <Input
          label="Senha:"
          name="senha"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={handleChange}
        />
        <Input
          label="Confirmar Senha:"
          name="senha2"
          type="password"
          placeholder="Confirmar Senha"
          value={senha2}
          onChange={handleChange}
        />
        <SubmitButton type="submit" text="Cadastrar" />
      </StyledForm>
    </FormContainer>
  );
}

export default Registrar;
