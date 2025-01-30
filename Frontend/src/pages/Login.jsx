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
    padding: 1.5rem;
  }
`;
// Estiliza o parágrafo
const Paragraph = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555555;
  text-align: center;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;
// Estiliza o link
const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  // Obtém a função login do contexto de autenticação
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext); // Obtém a função login do contexto de autenticação

  const navigate = useNavigate(); // Hook para navegação programática

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post("/usuario/login", { email, senha }, { withCredentials: true })
      .then(function (res) {
        login(); // Atualiza o estado de login
        toast.success(res.data.message);
        navigate(res.data.redirectTo);
      })
      .catch(function (err) {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          const errorMessage =
            err.response?.data?.message || "Erro ao efetuar login.";
          toast.error(errorMessage);
        }
      });
  };

  // Função para lidar com mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "senha") setSenha(value);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          label="Email:"
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleChange}
        />
        <Input
          label="Senha:"
          type="password"
          name="senha"
          placeholder="Senha"
          value={senha}
          onChange={handleChange}
        />
        <SubmitButton type="submit" text="Entrar" />
        <Paragraph>
          Ainda não possui uma conta?{" "}
          <StyledLink to="/registrar">Crie agora</StyledLink>
        </Paragraph>
      </StyledForm>
    </FormContainer>
  );
}

export default Login;
