import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

function LinkBotao({ text, to, ...props }) {
  return (
    <Link to={to} className="btn btn-primary" {...props}>
      {text}
    </Link>
  );
}

export default LinkBotao;