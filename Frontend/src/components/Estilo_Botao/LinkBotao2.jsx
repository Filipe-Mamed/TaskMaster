import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkBBotao2 = styled(Link)`

  @media (max-width: 600px) {
    width: 100%;
  }
`;

function LinkBotao2({ text, to }) {
  return <LinkBBotao2 className="btn btn-primary" to={to}>{text}</LinkBBotao2>;
}

export default LinkBotao2;
