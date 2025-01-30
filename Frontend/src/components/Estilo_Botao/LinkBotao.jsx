import { Link } from "react-router-dom";

function LinkBotao({ text, to }) {
  return (
    <Link className="btn btn-primary" to={to}>
      {text}
    </Link>
  );
}

export default LinkBotao;