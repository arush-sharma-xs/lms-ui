import { Link } from "react-router-dom";

export const LinkButton = ({ href, name }) => {
  return (
    <Link
      to={href}
      style={{
        border: "2px solid black",
        width: "150px",
        height: "40px",
        fontSize: "18px",
        borderRadius: "5px",
        backgroundColor: "#0a0a23",
        color: "white",
        display: "grid",
        placeItems: "center",
      }}
    >
      {name}
    </Link>
  );
};

export const FromLoginButton = () => {
  return (
    <button
      type="submit"
      style={{
        width: "80px",
        height: "40px",
        fontSize: "18px",
        borderRadius: "5px",
        backgroundColor: "#0C1844",
        color: "white",
        display: "grid",
        placeItems: "center",
      }}
    >
      Login
    </button>
  );
};
