import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LargeIcon = styled(FaTasks)`
  font-size: 48px;
`;

function EstiloFavicon() {
  return (
    <Link to="/" className="text-white navbar-brand">
      <LargeIcon />
    </Link>
  );
}

export default EstiloFavicon;

