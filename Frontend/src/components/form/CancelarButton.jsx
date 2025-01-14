import { Link } from "react-router-dom";

function CancelarButton({ text, to }) {
  return (
    <Link className="btn btn-secondary" to={to}>
      {text}
    </Link>
  );
}

export default CancelarButton;
