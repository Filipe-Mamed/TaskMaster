import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  opacity: ${(props) => (props.$isHover ? 0.5 : 1)};
  transition: opacity 0.3s ease;
`;

function EstiloDashboard() {
   // Estado para controlar se o link está sendo "hovered" ou não
  const [isHover, setIsHover] = useState(false);
   // Função chamada quando o mouse entra no link
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  // Função chamada quando o mouse sai do link
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <>
      <StyledLink
        to="/dados"
        className="nav-link text-white"
        aria-current="page"
        $isHover={isHover} // Usando $isHover em vez de isHover
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Dashboard
      </StyledLink>
    </>
  );
}

export default EstiloDashboard;
