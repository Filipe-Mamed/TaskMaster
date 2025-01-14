import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";

// Contêiner do Dropdown
const DropdwnContainer = styled.div`
  display: inline-block;
  position: relative;
`;
// Botão do Dropdown
const DropdwnButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;

  &:focus {
    outline: none;
  }
`;
// Menu do Dropdown
const DropdwnMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
`;
// Itens do Dropdown
const DropdwnItem = styled.li`
  padding: 0.25rem 1.5rem;
  color: #212529;
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }

  &:disabled {
    color: #6c757d;
    cursor: not-allowed;
  }
`;

function Dropdown({ toggleEditar, toggleEditarStatus, editar, editarStatus, resetTarefa }) {
  return (
    <DropdwnContainer className="btn-group dropstart">
      <DropdwnButton
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <BsThreeDotsVertical />
      </DropdwnButton>
      <DropdwnMenu className="dropdown-menu">
        <DropdwnItem
          className="dropdown-item"
          onClick={() => {
            toggleEditarStatus();
            if (editarStatus) resetTarefa(); // Reset ao fechar o menu de editar status
          }}
          disabled={editar}
        >
          {!editarStatus ? "Editar status" : "Fechar"}
        </DropdwnItem>
        <DropdwnItem
          className="dropdown-item"
          onClick={() => {
            toggleEditar();
            if (editar) resetTarefa(); // Reset ao fechar o menu de editar tarefa
          }}
          disabled={editarStatus}
        >
          {!editar ? "Editar tarefa" : "Fechar"}
        </DropdwnItem>
      </DropdwnMenu>
    </DropdwnContainer>
  );
}

export default Dropdown;
