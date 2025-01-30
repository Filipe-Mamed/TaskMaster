import { Link } from "react-router-dom";
import EstiloHome from "../components/Estilo_Navbar/EstiloHome";
import EstiloTarefas from "../components/Estilo_Navbar/EstiloTarefas";
import styled from "styled-components";
import EstiloFavicon from "../components/Estilo_Navbar/EstiloFavicon";
import EstiloFeedback from "../components/Estilo_Navbar/EstiloFeedback";
import EstiloDashboard from "../components/Estilo_Navbar/EstiloDashboard";
import Icon from "../components/Estilo_Navbar/Icon";
import LogoutButton from "../components/Estilo_LogoutButton/LogoutButton"
import { useContext } from "react";
import { AuthContext } from "../components/Autentificação_Global/AuthContext";

// Estiliza o contêiner da barra de navegação
const NavbarContainer = styled.nav`
  background-color: #000000;
`;

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <NavbarContainer className="navbar navbar-expand-lg bg-dark text-white"> {/* Contêiner da barra de navegação */}
      <div className="container-fluid">
        <Icon />
        <button // Botão para expandir/contrair a barra de navegação
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent"> {/* Contêiner para itens da barra de navegação */}
          <ul className="navbar-nav d-flex justify-content-evenly w-100">
            <li className="nav-item">
              <EstiloHome />
            </li>
            <li className="nav-item">
              <EstiloTarefas />
            </li>
            <li className="nav-item">
              <EstiloDashboard />
            </li>
            <li className="nav-item">
              <EstiloFeedback />
            </li>
            <li className="nav-item">
            {isAuthenticated && <LogoutButton />}
            </li>
          </ul>
        </div>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
