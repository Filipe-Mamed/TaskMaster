// SearchBar.js
import React from "react";
import styled from "styled-components";
import Input from "../form/input";

const SearchContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 1rem 0;
`;

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
