import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Autentificação_Global/AuthContext";
import Spinner from "../Spinner/Spinner";

function LogoutButton() {
  const { logout } = useContext(AuthContext); // Usando o contexto de autenticação
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true); // Define o estado de carregamento como verdadeiro
    api
      .get("/usuario/sair")
      .then(function (res) {
        logout(); // Atualiza o estado de logout
        toast.success(res.data.message); // Exibe a mensagem de sucesso do backend
        navigate(res.data.redirectTo);
      })
      .catch(function (err) {
        // Exibe a mensagem de erro caso haja algum problema "err.response?.data?.message" messagem de erro do backend
        const errorMessage =
          err.response?.data?.message || "Erro ao deslogar, tente novamente!";
        toast.error(errorMessage);
      })
      .finally(function () {
        setIsLoading(false);  // Define o estado de carregamento como falso
      });
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner />
          {""}
          <span style={{ marginLeft: "0.5rem"}}>Saindo...</span>
        </>
      ) : (
        "Sair"
      )}
    </button>
  );
}

export default LogoutButton;
