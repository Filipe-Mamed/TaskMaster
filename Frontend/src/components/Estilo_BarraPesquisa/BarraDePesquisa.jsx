// SearchBar.js
import React from "react";
import styled from "styled-components";
import Input from "../form/input";
// Estiliza o contêiner da barra de pesquisa
const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 1rem 0;
`;
// Define o componente BarraDePesquisa que recebe pesquisaConsulta e setpesquisaConsulta como props
const BarraDePesquisa = ({ pesquisaConsulta, setpesquisaConsulta }) => {
  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Pesquisar tarefas..."
        value={pesquisaConsulta}
        onChange={(e) => setpesquisaConsulta(e.target.value)}
      />
    </SearchContainer>
  );
};

export default BarraDePesquisa;
